// EventCard.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, Chip } from '@mui/material';
import { Event } from '@/types';
import { useEvents } from '@/hooks/useEvents';
import { useRouter } from 'next/navigation';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog';

interface EventCardProps {
    event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    const { deleteEvent } = useEvents();
    const router = useRouter();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        deleteEvent(event.id);
        setIsDeleteDialogOpen(false);
    };

    const handleDeleteCancel = () => {
        setIsDeleteDialogOpen(false);
    };

    const handleViewMore = () => {
        router.push(`/event/${event.id}`);
    };

    const handleEdit = () => {
        router.push(`/event/${event.id}/edit`);
    };

    return (
        <>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2">
                        {event.title}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                        {new Date(event.date).toLocaleDateString()}
                    </Typography>
                    <Chip
                        label={event.category?.name || 'Uncategorized'}
                        size="small"
                        sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                        {event.location.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 1,
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            overflow: 'hidden',
                        }}
                    >
                        {event.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleViewMore}>View More</Button>
                    <Button size="small" color="primary" onClick={handleEdit}>
                        Edit
                    </Button>
                    <Button size="small" color="error" onClick={handleDeleteClick}>
                        Delete
                    </Button>
                </CardActions>
            </Card>

            <DeleteConfirmationDialog
                open={isDeleteDialogOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                message={`Are you sure you want to delete "${event.title}"? This action cannot be undone.`}
            />
        </>
    );
};

export default EventCard;
