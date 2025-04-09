'use client';

import { useRouter } from 'next/navigation';
import EventForm from '@/components/events/CreateEventForm';
import { Box, Typography } from '@mui/material';
import { Event } from '@/types';
import { useEvents } from '@/hooks/useEvents';

const CreateEventPage: React.FC = () => {
    const router = useRouter();
    const { addEvent } = useEvents();

    const handleCreateEvent = async (newEvent: Omit<Event, 'id'>) => {
        addEvent(newEvent);
        router.push('/');
    };

    const handleCancel = () => {
        router.push('/');
    };

    return (
        <Box>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
                Create New Event
            </Typography>
            <EventForm
                mode="create"
                onSubmit={handleCreateEvent}
                onCancel={handleCancel}
            />
        </Box>
    );
};

export default CreateEventPage; 