import { useState, useMemo } from 'react';
import { Event } from '@/types';

interface UseEventFiltersProps {
    events: Event[];
}

interface UseEventFiltersReturn {
    selectedCategory: string;
    sortDirection: 'asc' | 'desc';
    filteredAndSortedEvents: Event[];
    handleCategoryChange: (categoryId: string) => void;
    handleSortDirectionChange: (direction: 'asc' | 'desc') => void;
}

export const useEventFilters = ({ events }: UseEventFiltersProps): UseEventFiltersReturn => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const handleCategoryChange = (categoryId: string) => {
        setSelectedCategory(categoryId);
    };

    const handleSortDirectionChange = (direction: 'asc' | 'desc') => {
        setSortDirection(direction);
    };

    const filteredAndSortedEvents = useMemo(() => {
        let filteredEvents = [...events];

        if (selectedCategory) {
            filteredEvents = filteredEvents.filter(
                event => event.categoryId === Number(selectedCategory)
            );
        }

        filteredEvents.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        });

        return filteredEvents;
    }, [events, selectedCategory, sortDirection]);

    return {
        selectedCategory,
        sortDirection,
        filteredAndSortedEvents,
        handleCategoryChange,
        handleSortDirectionChange,
    };
}; 