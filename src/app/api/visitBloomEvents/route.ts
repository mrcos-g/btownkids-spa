import { NextResponse } from 'next/server';
import { startOfMonth } from 'date-fns';
import { startOfNextMonthEncoded } from '@/lib/startOfNextMonthEncoded';

export async function GET() {
  try {
    const today = new Date();
    const firstDayOfMonthEncoded = encodeURIComponent(startOfMonth(today).toISOString());
    const firstDayOfNextMonthEncoded = startOfNextMonthEncoded(today);

    const tokenResponse = await fetch(
      'https://www.visitbloomington.com/plugins/core/get_simple_token/',
    );
    const token = await tokenResponse.text();
    const visitBloomURL = `https://www.visitbloomington.com/includes/rest_v2/plugins_events_events_by_date/find/?json=%7B%22filter%22%3A%7B%22active%22%3Atrue%2C%22%24and%22%3A%5B%7B%22categories.catId%22%3A%7B%22%24in%22%3A%5B%2226%22%2C%2225%22%2C%2229%22%2C%2232%22%2C%2223%22%2C%2227%22%2C%2228%22%2C%2222%22%2C%2224%22%5D%7D%7D%5D%2C%22date_range%22%3A%7B%22start%22%3A%7B%22%24date%22%3A%22${firstDayOfMonthEncoded}%22%7D%2C%22end%22%3A%7B%22%24date%22%3A%22${firstDayOfNextMonthEncoded}%22%7D%7D%2C%22categories.catId%22%3A%7B%22%24in%22%3A%5B%2226%22%5D%7D%7D%2C%22options%22%3A%7B%22count%22%3Atrue%2C%22castDocs%22%3Afalse%2C%22fields%22%3A%7B%22_id%22%3A%201%2C%22title%22%3A%201%2C%22description%22%3A%201%2C%22location%22%3A%201%2C%22address1%22%3A%201%2C%22address2%22%3A%201%2C%22city%22%3A%201%2C%22zip%22%3A%201%2C%22date%22%3A%201%2C%22dates%22%3A%201%2C%22startDate%22%3A%201%2C%22endDate%22%3A%201%2C%22startTime%22%3A%201%2C%22endTime%22%3A%201%2C%22recurrence%22%3A%201%2C%22recurType%22%3A%201%2C%22media_raw%22%3A%201%2C%22recid%22%3A%201%2C%22url%22%3A%201%2C%22categories%22%3A%201%2C%22accountId%22%3A%201%7D%2C%22hooks%22%3A%5B%5D%2C%22sort%22%3A%7B%22date%22%3A1%2C%22rank%22%3A1%2C%22title_sort%22%3A1%7D%7D%7D&token=${token}`;
    console.log(visitBloomURL);

    const visitBloomResponse = await fetch(visitBloomURL);

    const data = await visitBloomResponse.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: `Request failed: ${error}` }, { status: 500 });
  }
}
