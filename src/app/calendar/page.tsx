'use client';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridView from '@fullcalendar/daygrid';
import listMonth from '@fullcalendar/list';
import { format, startOfMonth, endOfMonth, differenceInDays } from 'date-fns';

import { fetchMcplEvents, fetchVisitBloomEvents } from '@/lib/fetchEvents';

interface McplEvent {
  title: string;
  start: string;
  end: string;
  description: string;
  color?: string;
  url: string;
}

const Calendar = () => {
  const [events, setEvents] = useState<McplEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date();
      const firstDayOfMonth = format(startOfMonth(today), 'yyyy-MM-dd');
      const lastDayOfMonth = endOfMonth(today);
      const remainingDaysInMonth = differenceInDays(lastDayOfMonth, new Date(firstDayOfMonth));

      try {
        const mcplEvents = await fetchMcplEvents(firstDayOfMonth, remainingDaysInMonth);
        const visitBloomEvents = await fetchVisitBloomEvents();
        const combinedEvents = [...mcplEvents, ...visitBloomEvents];
        setEvents(combinedEvents);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <FullCalendar
      plugins={[dayGridView, listMonth]}
      initialView="listMonth"
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
