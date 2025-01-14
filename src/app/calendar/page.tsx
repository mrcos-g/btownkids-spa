'use client';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridView from '@fullcalendar/daygrid';
import listMonth from '@fullcalendar/list';
import { format, startOfMonth, endOfMonth, differenceInDays } from 'date-fns';
import { mcplFormatter } from '@/lib/mcplFormatter';
import { visitBloomFormatter } from '@/lib/visitBloomFormatter';

interface McplEvent {
  title: string;
  start: string;
  end: string;
  description: string;
  color?: string;
  url: string;
}

const fetchMcplEvents = async (firstDayOfMonth: string, remainingDaysInMonth: number) => {
  const response = await fetch(
    `https://calendar.mcpl.info/eeventcaldata?event_type=0&req=%7B%22private%22%3Afalse%2C%22date%22%3A%22${firstDayOfMonth}%22%2C%22days%22%3A${remainingDaysInMonth}%2C%22ages%22%3A%5B%22Children%27s%22%5D%7D`,
  );
  const data = await response.json();
  return mcplFormatter(data);
};

const fetchVisitBloomEvents = async () => {
  const response = await fetch('/api/visitBloomEvents');
  const {
    docs: { docs: bloomEvents },
  } = await response.json();
  return visitBloomFormatter(bloomEvents);
};

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
