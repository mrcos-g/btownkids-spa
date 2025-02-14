import { NextResponse } from 'next/server';
import { startOfMonth } from 'date-fns';
import { startOfNextMonthEncoded } from '@/utils/dateUtils';
import { fetchVisitBloomToken, buildVisitBloomURL } from '@/lib/buildVisitBloomURL';

export async function GET() {
  try {
    const today = new Date();

    const firstDayOfMonth = startOfMonth(today);
    firstDayOfMonth.setUTCHours(5, 0, 0, 0);
    const firstDayOfMonthISO = firstDayOfMonth.toISOString();

    const firstDayOfNextMonthISO = startOfNextMonthEncoded(today);

    const token = await fetchVisitBloomToken();

    const visitBloomURL = buildVisitBloomURL(firstDayOfMonthISO, firstDayOfNextMonthISO, token);

    const visitBloomResponse = await fetch(visitBloomURL);
    const data = await visitBloomResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Request failed: ${error}` }, { status: 500 });
  }
}
