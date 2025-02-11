import { buildMcplURL } from '@/lib/buildMcplURL';
import { mcplFormatter, visitBloomFormatter } from '@/lib/formatters';

export const fetchMcplEvents = async (firstDayOfMonth: string, remainingDaysInMonth: number) => {
  const mcplUrl = buildMcplURL(firstDayOfMonth, remainingDaysInMonth);
  const response = await fetch(mcplUrl);
  const data = await response.json();
  return mcplFormatter(data);
};

export const fetchVisitBloomEvents = async () => {
  const URL = `${process.env.API_BASE_URL}/api/visitBloomEvents`;
  const response = await fetch(URL);
  console.log('response', response);
  const {
    docs: { docs: bloomEvents },
  } = await response.json();
  console.log({ bloomEvents });

  return visitBloomFormatter(bloomEvents);
};
