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

const CalendarPage = async () => {
  let events: FormattedVisitBloomEvent[] = [];
  let error: Error | null = null;

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/all-events`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    events = await response.json();
  } catch (err) {
    error = err as Error;
  }

  if (error) {
    return <div>Failed to fetch events: {error.message}</div>;
  }
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Calendar events={events || []} />
    </Box>
  );
};

export default CalendarPage;
