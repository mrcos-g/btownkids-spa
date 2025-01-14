import { mcplFormatter, visitBloomFormatter } from '@/lib/formatters';

export const fetchMcplEvents = async (firstDayOfMonth: string, remainingDaysInMonth: number) => {
  const response = await fetch(
    `https://calendar.mcpl.info/eeventcaldata?event_type=0&req=%7B%22private%22%3Afalse%2C%22date%22%3A%22${firstDayOfMonth}%22%2C%22days%22%3A${remainingDaysInMonth}%2C%22ages%22%3A%5B%22Children%27s%22%5D%7D`,
  );
  const data = await response.json();
  return mcplFormatter(data);
};

export const fetchVisitBloomEvents = async () => {
  const response = await fetch('/api/visitBloomEvents');
  const {
    docs: { docs: bloomEvents },
  } = await response.json();
  return visitBloomFormatter(bloomEvents);
};
