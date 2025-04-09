import { Box } from '@mui/material';
import EventCard from '@/components/events/EventCard';
import { Event } from '@/types';

interface EventsListProps {
    events: Event[];
}

export default function EventsList({ events }: EventsListProps) {
    if (events.length === 0) {
        return null;
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, width: '100%' }}>
            {events.map((event) => (
                <Box key={event.id} sx={{
                    display: 'flex',
                    flexGrow: 1,
                }}>
                    <EventCard event={event} />
                </Box>
            ))}
        </Box>
    );
} 