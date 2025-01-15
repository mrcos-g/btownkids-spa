'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridView from '@fullcalendar/daygrid';
import listMonth from '@fullcalendar/list';
import { useFetchEvents } from '@/hooks/useFetchEvents';

const Calendar = () => {
  const { events, error } = useFetchEvents();

  if (error) {
    return <div>Failed to fetch events: {error.message}</div>;
  }

  return (
    <FullCalendar
      plugins={[dayGridView, listMonth]}
      initialView="dayGridMonth"
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
    />
  );
};

export default Calendar;
