'use client';
import dynamic from 'next/dynamic';
import EventFilter from '@/components/EventFilter';

const Calendar = dynamic(() => import('@/components/Calendar'), { ssr: false });
const CalendarPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <EventFilter />
      <Calendar />
    </div>
  );
};

export default CalendarPage;
