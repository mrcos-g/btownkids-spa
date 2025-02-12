import { Box } from '@mui/material';
import Calendar from '@/components/Calendar';

export interface FormattedVisitBloomEvent {
  title: string;
  start: string;
  end: string;
  description: string;
  url: string;
  location?: string;
  source: string;
  color: string;
}

const getEvents = async (): Promise<FormattedVisitBloomEvent[]> => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/all-events`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
};

const CalendarPage = async () => {
  const events = await getEvents();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Calendar events={events || []} />
    </Box>
  );
};

export default CalendarPage;
