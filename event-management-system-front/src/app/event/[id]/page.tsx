'use client';

import { useParams } from 'next/navigation';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useEvents } from '@/hooks/useEvents';
import { useRouter } from 'next/navigation';
import EventMap from '@/components/events/EventMap';
import { useState } from 'react';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';
import EventNotFound from '@/components/events/EventNotFound';
import SimilarEvents from '@/components/events/SimilarEvents';
import EventDetails from '@/components/events/EventDetails';
import EventActions from '@/components/events/EventActions';

const EventDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { events, isLoading, error, deleteEvent } = useEvents();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        deleteEvent(Number(id));
        setIsDeleteDialogOpen(false);
        router.push('/');
    };

    const handleDeleteCancel = () => {
        setIsDeleteDialogOpen(false);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <EventNotFound text='Error loading event. Please try again later.' />;
    }

    const event = events.find(e => e.id === Number(id));
    if (!event) {
        return <EventNotFound text='Event not found' />;
    }

    return (
        <>
            <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                    {event.title}
                </Typography>

                <EventActions
                    eventId={event.id}
                    onDeleteClick={handleDeleteClick}
                />

                <EventDetails event={event} />

                <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h3" gutterBottom>Location on Map</Typography>
                    <Box sx={{ height: '520px' }}>
                        <EventMap
                            events={[event]}
                            selectedEvent={event}
                        />
                    </Box>
                </Paper>

                <Paper sx={{ p: 3, mb: 3 }}>
                    <SimilarEvents eventId={Number(id)} />
                </Paper>
            </Box>

            <DeleteConfirmationDialog
                open={isDeleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                title="Delete Event"
                message={`Are you sure you want to delete ${event.title} event? This action cannot be undone.`}
            />
        </>
    );
};

export default EventDetailsPage; 