'use client';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, Grid2, Typography } from '@mui/material';
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
  const calendarRef = useRef<FullCalendar>(null);
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
      <Grid2 container alignItems="center" justifyContent="center" spacing={2}>
        <Button
          variant="contained"
          onClick={() => {
            if (calendarRef.current) {
              calendarRef.current.getApi().prev();
            }
          }}
        >
          {`<`}
        </Button>

        {calendarRef.current && (
          <Typography variant="h4">{calendarRef.current.getApi().view.title}</Typography>
        )}

        <Button
          variant="contained"
          onClick={() => {
            if (calendarRef.current) {
              calendarRef.current.getApi().next();
            }
          }}
        >
          {`>`}
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            if (calendarRef.current) {
              calendarRef.current.getApi().changeView('listMonth');
            }
          }}
        >
          List View
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            if (calendarRef.current) {
              calendarRef.current.getApi().changeView('dayGridMonth');
            }
          }}
        >
          Month View
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            if (calendarRef.current) {
              calendarRef.current.getApi().today();
            }
          }}
        >
          Today
        </Button>
      </Grid2>
      <Box>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridView, listMonth]}
          initialView="listMonth"
          events={filteredEvents}
          datesSet={handleDatesSet}
          headerToolbar={false}
          eventClick={(event) => {
            event.jsEvent.preventDefault();
            window.open(event.event.url, '_blank');
          }}
          contentHeight={'auto'}
          dayMaxEvents={true}
        />
      </Box>
    </Box>
  );
};

export default Calendar;
