'use client';
import { useState } from 'react';
import { EventSource } from '@/components/EventFilter';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('@/components/Calendar'), { ssr: false });
import EventFilter from '@/components/EventFilter';

const CalendarPage = () => {
  const [sourceFilters, setSourceFilters] = useState<string[]>(Object.values(EventSource));
  const handleFilterChange = (selectedSources: string[]) => {
    setSourceFilters(selectedSources);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <EventFilter onFilterChange={handleFilterChange} />
      <Calendar sourceFilters={sourceFilters} />
    </div>
  );
};

export default CalendarPage;
