'use client';
import { FC, useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridView from '@fullcalendar/daygrid';
import listMonth from '@fullcalendar/list';
import { useEventSourceContext } from '@/context/EventSourceContext';
import { FormattedVisitBloomEvent } from '@/app/calendar/page';
import '../app/globals.css';

interface CalendarProps {
  initialEvents?: FormattedVisitBloomEvent[];
  error?: string | null;
}

const Calendar: FC<CalendarProps> = ({ initialEvents = [], error }) => {
  const { selectedSources } = useEventSourceContext();

  const [rawEvents, setRawEvents] = useState<FormattedVisitBloomEvent[]>(initialEvents);

  useEffect(() => {
    setRawEvents(initialEvents);
  }, [initialEvents]);

  const filteredEvents = useMemo(
    () => rawEvents.filter((event) => selectedSources.includes(event.source)),
    [rawEvents, selectedSources],
  );

  const handleDatesSet = async (dateInfo: { startStr: string; endStr: string }) => {
    const { startStr, endStr } = dateInfo;

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/all-events?start=${startStr}&end=${endStr}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: FormattedVisitBloomEvent[] = await response.json();

      setRawEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  if (error) {
    return <div>Failed to fetch events: </div>;
  }

  return (
    <Box sx={{ pt: 8 }}>
      <Box>
        <FullCalendar
          plugins={[dayGridView, listMonth]}
          initialView="listMonth"
          events={filteredEvents}
          datesSet={handleDatesSet}
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
      </Box>
    </Box>
  );
};

export default Calendar;
