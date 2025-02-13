'use client';
import { FC, useEffect, useState } from 'react';
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

  const [events, setEvents] = useState<FormattedVisitBloomEvent[]>(
    initialEvents.filter((event) => selectedSources.includes(event.source)),
  );

  useEffect(() => {
    setEvents(initialEvents.filter((event) => selectedSources.includes(event.source)));
  }, [initialEvents, selectedSources]);

  const handleEventSet = async (dateInfo: { startStr: string; endStr: string }) => {
    const { startStr, endStr } = dateInfo;
    console.log({ startStr, endStr });

    const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/all-events`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);

    // setEvents(data);
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
          events={events}
          datesSet={handleEventSet}
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
