import { Box } from '@mui/material';
import Calendar from '@/components/Calendar';

const CalendarPage = async () => {
  const data = await fetch(`${process.env.API_BASE_URL}/api/all-events`);
  const events = await data.json();
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Calendar events={events} />
    </Box>
  );
};

export default CalendarPage;
