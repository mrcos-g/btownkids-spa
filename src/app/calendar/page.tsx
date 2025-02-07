'use client';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

const Calendar = dynamic(() => import('@/components/Calendar'), { ssr: false });
const CalendarPage = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
      <Calendar />
    </Box>
  );
};

export default CalendarPage;
