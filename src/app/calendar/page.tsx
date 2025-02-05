'use client';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('@/components/Calendar'), { ssr: false });
const CalendarPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Calendar />
    </div>
  );
};

export default CalendarPage;
