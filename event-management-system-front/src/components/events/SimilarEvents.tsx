import React from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import { useSimilarEvents } from '@/hooks/useSimilarEvents';
import EventCard from './EventCard';

interface SimilarEventsProps {
    eventId: number;
    limit?: number;
}

const SimilarEvents: React.FC<SimilarEventsProps> = ({ eventId, limit = 3 }) => {
    const { similarEvents, isLoading, error } = useSimilarEvents(eventId, limit);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error">
                Error loading similar events. Please try again later.
            </Alert>
        );
    }

    if (similarEvents.length === 0) {
        return (
            <Alert severity="info">No similar events found.</Alert>
        );
    }

    return (
        <Box sx={{ mt: 1 }}>
            <Typography variant="h3" gutterBottom>Simular Events</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {similarEvents.map((event) => (
                    <Box key={event.id} sx={{ flex: '1 1 calc(33.333% - 24px)', minWidth: 250, display: 'flex' }}>
                        <EventCard event={event} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default SimilarEvents; 