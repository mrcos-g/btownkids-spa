import { NextResponse } from 'next/server';
import { format, startOfMonth, endOfMonth, differenceInDays } from 'date-fns';
import { fetchMcplEvents, fetchVisitBloomEvents } from '@/lib/fetchEvents';

export async function GET() {
  const today = new Date();
  const firstDayOfMonth = format(startOfMonth(today), 'yyyy-MM-dd');
  const lastDayOfMonth = endOfMonth(today);
  const remainingDaysInMonth = differenceInDays(lastDayOfMonth, new Date(firstDayOfMonth));
  try {
    const mcplEvents = await fetchMcplEvents(firstDayOfMonth, remainingDaysInMonth);
    const visitBloomEvents = await fetchVisitBloomEvents();
    const combinedEvents = [...mcplEvents, ...visitBloomEvents];
    return NextResponse.json(combinedEvents);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: `Request failed: ${errorMessage}` }, { status: 500 });
  }
}
