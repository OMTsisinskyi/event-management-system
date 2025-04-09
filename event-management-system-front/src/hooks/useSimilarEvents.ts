import { useQuery } from '@tanstack/react-query';
import { eventApi } from '@/services/api';

export const useSimilarEvents = (eventId: number, limit: number = 3) => {
    const { data: similarEvents = [], isLoading, error } = useQuery({
        queryKey: ['similarEvents', eventId, limit],
        queryFn: () => eventApi.getSimilar(eventId, limit),
    });

    return {
        similarEvents,
        isLoading,
        error,
    };
}; 