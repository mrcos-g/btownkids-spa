'use client';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Box, Button, Grid2, Modal, Tooltip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TodayIcon from '@mui/icons-material/Today';
import ViewListIcon from '@mui/icons-material/ViewList';
import { EventClickArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridView from '@fullcalendar/daygrid';
import listMonth from '@fullcalendar/list';
import { useEventSourceContext } from '@/context/EventSourceContext';
import { convertToEasternTime } from '@/utils/dateUtils';
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEventName, setSelectedEventName] = useState<string>('');
  const [selectedEventDescription, setSelectedEventDescription] = useState<string>('');
  const [selectedEventUrl, setSelectedEventUrl] = useState<string>('');
  const [selectedEventTime, setSelectedEventTime] = useState<string>('');
  const [selectedEventDate, setSelectedEventDate] = useState<string>('');

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

  const handleEventClick = (event: EventClickArg) => {
    event.jsEvent.preventDefault();

    let formattedTime = 'Time not available';
    let formattedDate = 'Date not available';

    if (event.event.startStr) {
      const { date, day, time: startTime } = convertToEasternTime(event.event.startStr);
      formattedTime = startTime;
      formattedDate = `${day}, ${date}`;
    }

    if (event.event.endStr) {
      const { time: endTime } = convertToEasternTime(event.event.endStr);
      formattedTime = `${formattedTime} - ${endTime}`;
    }

    setSelectedEventDate(formattedDate);
    setSelectedEventTime(formattedTime);
    setSelectedEventName(event.event.title);
    setSelectedEventDescription(event.event.extendedProps.description);
    setSelectedEventUrl(event.event.url);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedEventName('');
    setSelectedEventDescription('');
    setSelectedEventUrl('');
    setSelectedEventTime('');
    setModalOpen(false);
  };

  if (error) {
    return <div>Failed to fetch events: </div>;
  }

  return (
    <>
      <Box sx={{ pt: 8 }}>
        <Grid2
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          paddingTop={4}
          paddingBottom={2}
        >
          <Tooltip title="Previous">
            <Button
              variant="contained"
              onClick={() => {
                if (calendarRef.current) {
                  calendarRef.current.getApi().prev();
                }
              }}
            >
              <ArrowBackIcon />
            </Button>
          </Tooltip>

          {calendarRef.current && (
            <Typography
              variant="h5"
              sx={{
                width: '200px',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {calendarRef.current.getApi().view.title}
            </Typography>
          )}

          <Tooltip title="Next">
            <Button
              variant="contained"
              onClick={() => {
                if (calendarRef.current) {
                  calendarRef.current.getApi().next();
                }
              }}
            >
              <ArrowForwardIcon />
            </Button>
          </Tooltip>
        </Grid2>

        <Grid2
          container
          alignItems="center"
          justifyContent="center"
          spacing={2}
          paddingBottom={4}
          paddingTop={2}
        >
          <Tooltip title="List View">
            <Button
              variant="contained"
              onClick={() => {
                if (calendarRef.current) {
                  calendarRef.current.getApi().changeView('listMonth');
                }
              }}
            >
              <ViewListIcon />
            </Button>
          </Tooltip>

          <Tooltip title="Month View">
            <Button
              variant="contained"
              onClick={() => {
                if (calendarRef.current) {
                  calendarRef.current.getApi().changeView('dayGridMonth');
                }
              }}
            >
              <CalendarMonthIcon />
            </Button>
          </Tooltip>

          <Tooltip title="Today">
            <Button
              variant="contained"
              onClick={() => {
                if (calendarRef.current) {
                  calendarRef.current.getApi().today();
                }
              }}
            >
              <TodayIcon />
            </Button>
          </Tooltip>
        </Grid2>
        <Box sx={{ mr: 1.5, ml: 1.5 }}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridView, listMonth]}
            initialView="listMonth"
            events={filteredEvents}
            datesSet={handleDatesSet}
            headerToolbar={false}
            eventClick={handleEventClick}
            contentHeight={'auto'}
            dayMaxEvents={true}
          />
        </Box>
      </Box>
      <Modal
        open={modalOpen}
        onClose={(event, reason) => {
          if (reason === 'backdropClick') {
            handleModalClose();
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white',
            p: 4,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ pb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {selectedEventName}
              </Typography>
            </Box>
            <Box sx={{ pb: 2 }}>
              <Typography variant="body1">{selectedEventDate}</Typography>
              <Typography variant="body1">{selectedEventTime}</Typography>
            </Box>
            <Box sx={{ pb: 2 }}>
              {selectedEventDescription ? (
                <Typography variant="body1">{selectedEventDescription}</Typography>
              ) : (
                <Typography variant="body1">No description available.</Typography>
              )}
            </Box>

            <Link href={selectedEventUrl} target="_blank">
              <Typography variant="body1" sx={{ color: 'blue', cursor: 'pointer', pt: 4 }}>
                More Information
              </Typography>
            </Link>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Calendar;
