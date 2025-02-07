'use client';
import { useEffect, useState, FC } from 'react';
import { Box } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridView from '@fullcalendar/daygrid';
import listMonth from '@fullcalendar/list';
import { useFetchEvents } from '@/hooks/useFetchEvents';
import { useEventSourceContext } from '@/context/EventSourceContext';
import '../app/globals.css';

const Calendar: FC = () => {
  const { events, error } = useFetchEvents();
  const { selectedSources } = useEventSourceContext();
  const [calendarView, setCalendarView] = useState(
    window.innerWidth < 768 ? 'listMonth' : 'dayGridMonth',
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialView = window.innerWidth < 768 ? 'listMonth' : 'dayGridMonth';
      setCalendarView(initialView);

      const updateView = () => {
        if (window.innerWidth < 768) {
          setCalendarView('listMonth');
        } else {
          setCalendarView('dayGridMonth');
        }
      };

      window.addEventListener('resize', updateView);

      return () => window.removeEventListener('resize', updateView);
    }
  }, []);

  if (error) {
    return <div>Failed to fetch events: {error.message}</div>;
  }

  const filteredEvents = (events || []).filter((event) => {
    return selectedSources.includes(event.source);
  });

  return (
    <Box sx={{ pt: 8 }}>
      <Box>
        <FullCalendar
          plugins={[dayGridView, listMonth]}
          initialView={calendarView}
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
