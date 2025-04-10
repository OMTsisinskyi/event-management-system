'use client';

import { Box, CircularProgress, Alert, Typography } from '@mui/material';
import { useEvents } from '@/hooks/useEvents';
import { useState } from 'react';
import MapView from '@/components/events/MapView';
import { useCategories } from '@/hooks/useCategories';
import { useEventFilters } from '@/hooks/useEventFilters';
import EventsControls from '@/components/events/EventsControls';
import EventsList from '@/components/events/EventsList';

const Home: React.FC = () => {
  const { events, isLoading, error } = useEvents();
  const { categories } = useCategories();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const {
    selectedCategory,
    sortDirection,
    filteredAndSortedEvents,
    handleCategoryChange,
    handleSortDirectionChange,
  } = useEventFilters({ events });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Error loading events. Please try again later.
        </Alert>
      </Box>
    );
  }

  console.log(viewMode);


  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          Upcoming Events
        </Typography>
      </Box>

      <EventsControls
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        sortDirection={sortDirection}
        onSortDirectionChange={handleSortDirectionChange}
        categories={categories}
        eventsCount={events.length}
      />

      {filteredAndSortedEvents.length > 0 ? (
        viewMode === 'list' ? (
          <EventsList events={filteredAndSortedEvents} />
        ) : (
          <MapView events={filteredAndSortedEvents} />
        )
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No events found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Home;