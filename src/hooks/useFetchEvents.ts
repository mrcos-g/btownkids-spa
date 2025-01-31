import { useEffect, useState } from 'react';
import { format, startOfMonth, endOfMonth, differenceInDays } from 'date-fns';
import { fetchMcplEvents, fetchVisitBloomEvents } from '@/lib/fetchEvents';

interface McplEvent {
  title: string;
  start: string;
  end: string;
  description: string;
  color?: string;
  url: string;
  source: string;
}

export const useFetchEvents = () => {
  const [events, setEvents] = useState<McplEvent[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date();
      const firstDayOfMonth = format(startOfMonth(today), 'yyyy-MM-dd');
      const lastDayOfMonth = endOfMonth(today);
      const remainingDaysInMonth = differenceInDays(lastDayOfMonth, new Date(firstDayOfMonth));

      try {
        const mcplEvents = await fetchMcplEvents(firstDayOfMonth, remainingDaysInMonth);
        const visitBloomEvents = await fetchVisitBloomEvents();
        const combinedEvents = [...mcplEvents, ...visitBloomEvents];
        setEvents(combinedEvents);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchEvents();
  }, []);

  return { events, error };
};
