'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Box, TextField, Button } from '@mui/material';
import { Location } from '@/types';

const MAP_CONTAINER_STYLE = {
    width: '100%',
    height: '400px',
};

interface LocationPickerProps {
    value: Location;
    onChange: (location: Location) => void;
    error?: string;
}

const LocationPicker: React.FC<LocationPickerProps> = ({ value, onChange, error }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [searchError, setSearchError] = useState<string | null>(null);

    const center = useMemo(() => ({
        lat: value.lat || 0,
        lng: value.lng || 0,
    }), [value.lat, value.lng]);

    const markerPosition = useMemo(() => ({
        lat: value.lat,
        lng: value.lng,
    }), [value.lat, value.lng]);

    const getAddressFromLatLng = async (lat: number, lng: number) => {
        const geocoder = new google.maps.Geocoder();
        try {
            const result = await geocoder.geocode({ location: { lat, lng } });
            if (result.results[0]) {
                return result.results[0].formatted_address;
            }
        } catch (error) {
            console.error('Reverse geocoding error:', error);
        }
        return 'Selected Location';
    };

    const handleMapClick = useCallback(async (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
            const lat = e.latLng.lat();
            const lng = e.latLng.lng();
            const address = await getAddressFromLatLng(lat, lng);
            const newLocation = {
                name: address,
                lat,
                lng,
            };
            onChange(newLocation);
        }
    }, [onChange]);

    const handleSearch = useCallback(async () => {
        if (!searchQuery) return;

        const geocoder = new google.maps.Geocoder();
        try {
            const result = await geocoder.geocode({ address: searchQuery });

            if (!result.results || result.results.length === 0) {
                setSearchError('No locations found for this search query');
                return;
            }

            const location = result.results[0];
            const newLocation = {
                name: location.formatted_address,
                lat: location.geometry.location.lat(),
                lng: location.geometry.location.lng(),
            };
            onChange(newLocation);
            map?.panTo(location.geometry.location);
            map?.setZoom(15);
            setSearchError(null);
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message.includes('ZERO_RESULTS')) {
                    setSearchError('No locations found for this search query');
                } else {
                    console.error('Geocoding error:', error);
                    setSearchError('Error searching for location. Please try again.');
                }
            } else {
                console.error('Unknown error:', error);
                setSearchError('An unknown error occurred.');
            }
        }
    }, [searchQuery, map, onChange]);

    return (
        <Box>
            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    label="Search Location"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSearchError(null);
                    }}
                    error={!!searchError}
                    helperText={searchError}
                    sx={{ mb: 1 }}
                />
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    disabled={!searchQuery}
                >
                    Search
                </Button>
            </Box>

            <Box sx={{ mb: 2 }}>
                <GoogleMap
                    mapContainerStyle={MAP_CONTAINER_STYLE}
                    center={center}
                    zoom={value.lat && value.lng ? 15 : 2}
                    onClick={handleMapClick}
                    onLoad={setMap}
                >
                    {(value.lat && value.lng) && (
                        <Marker
                            position={markerPosition}
                        />
                    )}
                </GoogleMap>
            </Box>

            <Box sx={{ mb: 2 }}>
                <TextField
                    fullWidth
                    disabled
                    label="Location Name"
                    value={value.name}
                    onChange={(e) => onChange({ ...value, name: e.target.value })}
                    helperText={error}
                />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                    label="Latitude"
                    type="number"
                    value={value.lat}
                    onChange={(e) => onChange({ ...value, lat: parseFloat(e.target.value) })}
                    error={!!error}
                />
                <TextField
                    label="Longitude"
                    type="number"
                    value={value.lng}
                    onChange={(e) => onChange({ ...value, lng: parseFloat(e.target.value) })}
                    error={!!error}
                />
            </Box>
        </Box>
    );
};

export default LocationPicker; 