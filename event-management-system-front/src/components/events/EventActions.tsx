'use client';

import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface EventActionsProps {
    eventId: number;
    onDeleteClick: () => void;
}

export default function EventActions({ eventId, onDeleteClick }: EventActionsProps) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/event/${eventId}/edit`);
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
                variant="outlined"
                onClick={() => router.push('/')}
            >
                Back to Events
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
            >
                Edit Event
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={onDeleteClick}
            >
                Delete Event
            </Button>
        </Box>
    );
} 