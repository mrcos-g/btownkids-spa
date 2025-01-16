import Calendar from '@/components/Calendar/Calendar';

const CalendarPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Calendar />
      <footer className="flex flex-wrap items-center justify-center gap-6 bg-gray-800 p-4"></footer>
    </div>
  );
};

export default CalendarPage;
