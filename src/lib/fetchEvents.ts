import { startOfMonth } from 'date-fns';
import { buildMcplURL } from '@/lib/buildMcplURL';
import { startOfNextMonthEncoded } from '@/lib/startOfNextMonthEncoded';
import { buildVisitBloomURL, fetchVisitBloomToken } from '@/lib/buildVisitBloomURL';
import { mcplFormatter, visitBloomFormatter } from '@/lib/formatters';

export const fetchMcplEvents = async (firstDayOfMonth: string, remainingDaysInMonth: number) => {
  const mcplUrl = buildMcplURL(firstDayOfMonth, remainingDaysInMonth);
  const response = await fetch(mcplUrl);
  const data = await response.json();
  return mcplFormatter(data);
};

export const fetchBloomEvents = async (date: Date) => {
  const firstDayOfMonth = startOfMonth(date);
  firstDayOfMonth.setUTCHours(5, 0, 0, 0);
  const firstDayOfMonthISO = firstDayOfMonth.toISOString();

  const firstDayOfNextMonthISO = startOfNextMonthEncoded(date);

  const token = await fetchVisitBloomToken();
  console.log({ token });

  const visitBloomURL = buildVisitBloomURL(firstDayOfMonthISO, firstDayOfNextMonthISO, token);

  const visitBloomResponse = await fetch(visitBloomURL);
  const {
    docs: { docs: events },
  } = await visitBloomResponse.json();

  return visitBloomFormatter(events);
};
