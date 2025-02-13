import { NextResponse } from 'next/server';
import { format, parseISO, startOfMonth, endOfMonth, differenceInDays } from 'date-fns';
import { fetchMcplEvents, fetchBloomEvents } from '@/lib/fetchEvents';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let start = searchParams.get('start');
  let end = searchParams.get('end');

  const today = new Date();
  const dateFormat = 'yyyy-MM-dd';
  if (!start || !end) {
    start = format(startOfMonth(today), dateFormat);
    end = format(endOfMonth(today), dateFormat);
  }

  const startDate = parseISO(start).toISOString();
  const endDate = parseISO(end).toISOString();
  const remainingDaysInMonth = differenceInDays(endDate, startDate);

  try {
    const mcplEvents = await fetchMcplEvents(startDate, remainingDaysInMonth);

    const newBloomEvents = await fetchBloomEvents(startDate, endDate);

    const combinedEvents = [...mcplEvents, ...newBloomEvents];
    return NextResponse.json(combinedEvents);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: `Request failed: ${errorMessage}` }, { status: 500 });
  }
}
