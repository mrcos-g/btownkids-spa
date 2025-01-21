'use client';
import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridView from '@fullcalendar/daygrid';
import listMonth from '@fullcalendar/list';
import { useFetchEvents } from '@/hooks/useFetchEvents';

const Calendar = () => {
  const { events, error } = useFetchEvents();
  const [calendarView, setCalendarView] = useState(
    window.innerWidth < 768 ? 'listMonth' : 'dayGridMonth',
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateView = () => {
        if (window.innerWidth < 768) {
          setCalendarView('listMonth');
        } else {
          setCalendarView('dayGridMonth');
        }
      };

      window.addEventListener('resize', updateView);
      updateView();

      return () => window.removeEventListener('resize', updateView);
    }
  }, []);

  if (error) {
    return <div>Failed to fetch events: {error.message}</div>;
  }

  return (
    <div className="h-full">
      <FullCalendar
        plugins={[dayGridView, listMonth]}
        initialView={calendarView}
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'listMonth dayGridMonth',
        }}
        eventClick={(event) => {
          event.jsEvent.preventDefault();
          window.open(event.event.url, '_blank');
        }}
        contentHeight={'auto'}
      />
    </div>
  );
};

export default Calendar;
