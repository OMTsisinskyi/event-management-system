import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { eventApi } from '@/services/api';
import { Event } from '@/types';
import { showSuccessToast, showErrorToast, toastMessages } from '@/utils/toast';

export const useEvents = () => {
    const queryClient = useQueryClient();

    const { data: events = [], isLoading, error } = useQuery({
        queryKey: ['events'],
        queryFn: eventApi.getAll,
        staleTime: 5 * 60 * 1000, 
        gcTime: 30 * 60 * 1000,
    });

    const addEventMutation = useMutation({
        mutationFn: eventApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
            showSuccessToast(toastMessages.eventCreated);
        },
        onError: () => {
            showErrorToast(toastMessages.eventError);
        },
    });

    const updateEventMutation = useMutation({
        mutationFn: ({ id, event }: { id: number; event: Omit<Event, 'id'> }) =>
            eventApi.update(id, event),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
            showSuccessToast(toastMessages.eventUpdated);
        },
        onError: () => {
            showErrorToast(toastMessages.eventError);
        },
    });

    const deleteEventMutation = useMutation({
        mutationFn: eventApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
            showSuccessToast(toastMessages.eventDeleted);
        },
        onError: () => {
            showErrorToast(toastMessages.eventError);
        },
    });

    return {
        events,
        isLoading,
        error,
        addEvent: (event: Omit<Event, 'id'>) => addEventMutation.mutateAsync(event),
        updateEvent: ({ id, event }: { id: number; event: Omit<Event, 'id'> }) =>
            updateEventMutation.mutateAsync({ id, event }),
        deleteEvent: (id: number) => deleteEventMutation.mutateAsync(id),
    };
}; 