import Calendar from '@/components/Calendar';
import EventFilter from '@/components/EventFilter';

const CalendarPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <EventFilter />
      <Calendar />
    </div>
  );
};

export default CalendarPage;
