import React from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { Event, Location } from '@/types';
import LocationPicker from '../LocationPicker';
import CategoryList from '../CategoryList';
import { commonValidationRules } from '@/utils/validation';
import { useCategories } from '@/hooks/useCategories';

interface EventFormProps {
    onSubmit: (values: Omit<Event, 'id'>) => void;
    onCancel: () => void;
    initialEvent?: Event;
    mode: 'create' | 'edit';
}

type EventFormValues = {
    title: string;
    date: string;
    location: Location;
    description: string;
    categoryId: number | null;
};

const validationSchema = Yup.object(commonValidationRules);

const EventForm: React.FC<EventFormProps> = ({ onSubmit, onCancel, initialEvent, mode }) => {
    const { isLoading } = useCategories();

    const initialValues: EventFormValues = initialEvent ? {
        title: initialEvent.title,
        date: new Date(initialEvent.date).toISOString().split('T')[0],
        location: initialEvent.location,
        description: initialEvent.description,
        categoryId: initialEvent.categoryId,
    } : {
        title: '',
        date: new Date().toISOString().split('T')[0],
        location: {
            name: '',
            lat: 0,
            lng: 0,
        },
        description: '',
        categoryId: null,
    };

    const handleSubmit = (values: EventFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            if (values.categoryId === null) {
                throw new Error('Please select a category');
            }
            onSubmit(values as Omit<Event, 'id'>);
        } catch (error) {
            console.error('Failed to submit form:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={true}
        >
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <Box sx={{ 
                        display: 'flex', 
                        gap: 3,
                        flexDirection: { xs: 'column', md: 'row' }
                    }}>
                        <Paper sx={{ p: 3, flex: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                {mode === 'create' ? 'Create New Event' : 'Edit Event'}
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    name="title"
                                    label="Title"
                                    error={touched.title && Boolean(errors.title)}
                                    helperText={touched.title && errors.title}
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    type="date"
                                    name="date"
                                    label="Date"
                                    InputLabelProps={{ shrink: true }}
                                    error={touched.date && Boolean(errors.date)}
                                    helperText={touched.date && errors.date}
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Field
                                    as={TextField}
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name="description"
                                    label="Description"
                                    error={touched.description && Boolean(errors.description)}
                                    helperText={touched.description && errors.description}
                                />
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Field name="categoryId">
                                    {({ field, form }: FieldProps<EventFormValues>) => (
                                        <CategoryList
                                            selectedCategoryId={typeof field.value === 'number' ? field.value : undefined}
                                            onSelectCategory={(categoryId) => form.setFieldValue('categoryId', categoryId)}
                                            error={form.touched.categoryId && form.errors.categoryId ? String(form.errors.categoryId) : undefined}
                                            touched={Boolean(form.touched.categoryId)}
                                        />
                                    )}
                                </Field>
                            </Box>

                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    onClick={onCancel}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create' : 'Save'}
                                </Button>
                            </Box>
                        </Paper>

                        <Paper sx={{ p: 3, flex: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                Location
                            </Typography>
                            <Field name="location">
                                {({ field, form }: FieldProps<Location>) => (
                                    <LocationPicker
                                        value={field.value}
                                        onChange={(location) => form.setFieldValue('location', location)}
                                        error={form.touched.location && form.errors.location ? String(form.errors.location) : undefined}
                                    />
                                )}
                            </Field>
                        </Paper>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default EventForm; 