'use client';

import { Box, Button, ToggleButton, ToggleButtonGroup, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Category } from '@/types';

interface EventsControlsProps {
    viewMode: 'list' | 'map';
    onViewModeChange: (mode: 'list' | 'map') => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    sortDirection: 'asc' | 'desc';
    onSortDirectionChange: (direction: 'asc' | 'desc') => void;
    categories: Category[];
    eventsCount: number;
}

export default function EventsControls({
    viewMode,
    onViewModeChange,
    selectedCategory,
    onCategoryChange,
    sortDirection,
    onSortDirectionChange,
    categories,
    eventsCount
}: EventsControlsProps) {
    const router = useRouter();

    const handleViewModeChange = (
        newMode: 'list' | 'map' | null,
    ) => {
        console.log(newMode);

        if (newMode !== null) {
            onViewModeChange(newMode);
        }
    };

    const handleCategorySelectChange = (event: SelectChangeEvent) => {
        onCategoryChange(event.target.value);
    };

    const handleSortDirectionSelectChange = (event: SelectChangeEvent) => {
        onSortDirectionChange(event.target.value as 'asc' | 'desc');
    };

    return (
        <Box sx={{
            mb: 4,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                width: { xs: '100%', md: 'auto' }
            }}>
                <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
                    <InputLabel>Filter by Category</InputLabel>
                    <Select
                        value={selectedCategory}
                        label="Filter by Category"
                        onChange={handleCategorySelectChange}
                    >
                        <MenuItem value="">All Categories ({eventsCount})</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name} ({category._count?.events || 0})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: { xs: '100%', sm: 200 } }}>
                    <InputLabel>Sort by Date</InputLabel>
                    <Select
                        value={sortDirection}
                        label="Sort by Date"
                        onChange={handleSortDirectionSelectChange}
                    >
                        <MenuItem value="asc">Oldest First</MenuItem>
                        <MenuItem value="desc">Newest First</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                width: { xs: '100%', md: 'auto' }
            }}>
                <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(_, newMode) => handleViewModeChange(newMode)}
                    aria-label="view mode"
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    <ToggleButton value="list" aria-label="list view" sx={{ flex: { xs: 1, sm: 'none' } }}>
                        List View
                    </ToggleButton>
                    <ToggleButton value="map" aria-label="map view" sx={{ flex: { xs: 1, sm: 'none' } }}>
                        Map View
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push('/create')}
                    sx={{ width: { xs: '100%', sm: 'auto' } }}
                >
                    Create Event
                </Button>
            </Box>
        </Box>
    );
} 