'use client';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('@/components/Calendar'), { ssr: false });
import EventFilter from '@/components/EventFilter';

const CalendarPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <EventFilter />
      <Calendar />
    </div>
  );
};

export default CalendarPage;
