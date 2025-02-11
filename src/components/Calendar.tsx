'use client';
import { FC } from 'react';
import { Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridView from '@fullcalendar/daygrid';
import listMonth from '@fullcalendar/list';
import { useEventSourceContext } from '@/context/EventSourceContext';
import '../app/globals.css';

interface FormattedVisitBloomEvent {
  title: string;
  start: string;
  end: string;
  description: string;
  url: string;
  location?: string;
  source: string;
  color: string;
}

interface CalendarProps {
  events: FormattedVisitBloomEvent[] | null;
  error?: string | null;
}

const Calendar: FC<CalendarProps> = ({ events, error }) => {
  const { selectedSources } = useEventSourceContext();

  if (error) {
    return <div>Failed to fetch events: </div>;
  }

  const filteredEvents = (events || []).filter((event) => {
    return selectedSources.includes(event.source);
  });

  return (
    <Box sx={{ pt: 8 }}>
      <Box>
        <FullCalendar
          plugins={[dayGridView, listMonth]}
          initialView="listMonth"
          events={filteredEvents}
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
