import { buildMcplURL } from '@/lib/buildMcplURL';
import { buildVisitBloomURL, fetchVisitBloomToken } from '@/lib/buildVisitBloomURL';
import { mcplFormatter, visitBloomFormatter } from '@/lib/formatters';

export const fetchMcplEvents = async (firstDayOfMonth: string, remainingDaysInMonth: number) => {
  const mcplUrl = buildMcplURL(firstDayOfMonth, remainingDaysInMonth);
  const response = await fetch(mcplUrl);
  const data = await response.json();
  return mcplFormatter(data);
};

export const fetchBloomEvents = async (startDate: string, endDate: string) => {
  const token = await fetchVisitBloomToken();
  const visitBloomURL = buildVisitBloomURL(startDate, endDate, token);

  const visitBloomResponse = await fetch(visitBloomURL);
  const {
    docs: { docs: events },
  } = await visitBloomResponse.json();

  return visitBloomFormatter(events);
};
