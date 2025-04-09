import * as Yup from 'yup';

export const commonValidationRules = {
    title: Yup.string()
        .required('Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must not exceed 100 characters'),
    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(500, 'Description must not exceed 500 characters'),
    date: Yup.date()
        .required('Date is required'),
    location: Yup.object({
        name: Yup.string().required('Location name is required'),
        lat: Yup.number()
            .required('Latitude is required')
            .min(-90, 'Latitude must be between -90 and 90')
            .max(90, 'Latitude must be between -90 and 90'),
        lng: Yup.number()
            .required('Longitude is required')
            .min(-180, 'Longitude must be between -180 and 180')
            .max(180, 'Longitude must be between -180 and 180'),
    }),
    categoryId: Yup.number()
        .required('Category is required'),
}; 