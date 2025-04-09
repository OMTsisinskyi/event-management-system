import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import EventMap from './EventMap';
import { Event } from '@/types';

interface MapViewProps {
    events: Event[];
}

const MapView: React.FC<MapViewProps> = ({ events }) => {
    const router = useRouter();
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleMarkerClick = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleInfoWindowClose = () => {
        setSelectedEvent(null);
    };

    const handleEventClick = (event: Event) => {
        router.push(`/event/${event.id}`);
    };

    return (
        <Box>
            <Box sx={{ height: '500px', mt: '19%', mb: 4, }}>
                <EventMap
                    events={events}
                    onMarkerClick={handleMarkerClick}
                    selectedEvent={selectedEvent}
                    onInfoWindowClose={handleInfoWindowClose}
                />
            </Box>

            {selectedEvent && (
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        onClick={() => handleEventClick(selectedEvent)}
                    >
                        View Event Details
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default MapView; 