import { Box, Typography, Chip, Paper } from '@mui/material';
import { Event } from '@/types';

interface EventDetailsProps {
    event: Event;
}

export default function EventDetails({ event }: EventDetailsProps) {
    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Chip
                    label={event.category?.name}
                    color="primary"
                    sx={{ mr: 1 }}
                />
                <Typography variant="body1" color="text.secondary" component="span">
                    {new Date(event.date).toLocaleDateString()}
                </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Location</Typography>
                <Typography variant="body1">{event.location.name}</Typography>
            </Box>

            <Box>
                <Typography variant="h6" gutterBottom>Description</Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {event.description}
                </Typography>
            </Box>
        </Paper>
    );
} 