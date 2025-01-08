'use client';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridView from '@fullcalendar/daygrid';
import listMonth from '@fullcalendar/list';
import { differenceInDays, startOfMonth, endOfMonth, format } from 'date-fns';

import { mcplFormatter } from '@/lib/mcplFormatter';

interface McplEvent {
  title: string;
  start: string;
  end: string;
  description: string;
}
const Calendar = () => {
  const [events, setEvents] = useState<McplEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const today = format(new Date(), 'yyyy-MM-dd');
      const firstDayOfMonth = format(startOfMonth(today), 'yyyy-MM-dd');
      const lastDayOfMonth = endOfMonth(today);
      const remainingDaysInMonth = differenceInDays(lastDayOfMonth, firstDayOfMonth);

      const response = await fetch(
        `https://calendar.mcpl.info/eeventcaldata?event_type=0&req=%7B%22private%22%3Afalse%2C%22date%22%3A%22${firstDayOfMonth}%22%2C%22days%22%3A${remainingDaysInMonth}%2C%22ages%22%3A%5B%22Children%27s%22%5D%7D`,
      );

      const formattedData = mcplFormatter(await response.json());
      setEvents(formattedData);
    };

    const fetchVisitBloomEvents = async () => {
      try {
        const response = await fetch('/api/visitBloomEvents');
        const { events } = await response.json();
        console.log(events);
      } catch (error) {
        console.error('Failed to fetch token:', error);
      }
    };

    fetchEvents();
    fetchVisitBloomEvents();
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
    />
  );
};

export default Calendar;
