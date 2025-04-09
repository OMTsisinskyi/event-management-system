import React, { useMemo, useCallback } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { Event } from '@/types';
import { Box, Typography } from '@mui/material';

interface EventMapProps {
    events: Event[];
    onMarkerClick?: (event: Event) => void;
    selectedEvent?: Event | null;
    onInfoWindowClose?: () => void;
}

const EventMap: React.FC<EventMapProps> = ({
    events,
    onMarkerClick,
    selectedEvent,
    onInfoWindowClose,
}) => {

    const mapContainerStyle = useMemo(() => ({
        width: '100%',
        height: '500px',
    }), []);

    const center = useMemo(() => ({
        lat: 0,
        lng: 0,
    }), []);

    const handleMarkerClick = useCallback((event: Event) => {
        onMarkerClick?.(event);
    }, [onMarkerClick]);

    const selectedEventPosition = useMemo(() =>
        selectedEvent ? {
            lat: selectedEvent.location.lat,
            lng: selectedEvent.location.lng,
        } : null
        , [selectedEvent]);

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={2}
            options={{
                maxZoom: 18,
                minZoom: 2,
                gestureHandling: 'greedy',
                disableDefaultUI: true,
                zoomControl: true,
                mapTypeControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
            }}
        >
            {events.map((event) => (
                <Marker
                    key={event.id}
                    position={{
                        lat: event.location.lat,
                        lng: event.location.lng,
                    }}
                    onClick={() => handleMarkerClick(event)}
                />
            ))}

            {selectedEvent && selectedEventPosition && (
                <InfoWindow
                    position={selectedEventPosition}
                    onCloseClick={onInfoWindowClose}
                >
                    <Box sx={{ p: 1, maxWidth: 200 }}>
                        <Typography variant="subtitle1" component="h3">
                            {selectedEvent.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {selectedEvent.location.name}
                        </Typography>
                        <Typography variant="body2">
                            {new Date(selectedEvent.date).toLocaleDateString()}
                        </Typography>
                    </Box>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default React.memo(EventMap); 