'use client';

import { useParams, useRouter } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { useEvents } from '@/hooks/useEvents';
import EventForm from '@/components/events/CreateEventForm';
import { Event } from '@/types';
import EventNotFound from '@/components/events/EventNotFound';

const EditEventPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { events, updateEvent } = useEvents();

    const event = events.find(e => e.id === Number(id));

    if (!event) {
        return <EventNotFound text='Event not found' />;
    }

    const handleSubmit = (updatedEvent: Omit<Event, 'id'>) => {
        updateEvent({ id: Number(id), event: updatedEvent });
        router.push(`/event/${id}`);
    };

    const handleCancel = () => {
        router.push(`/event/${id}`);
    };

    return (
        <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                Edit Event
            </Typography>
            <EventForm
                initialEvent={event}
                mode="edit"
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </Box>
    );
};

export default EditEventPage; 