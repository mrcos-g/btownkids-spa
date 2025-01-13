import { toZonedTime, format } from 'date-fns-tz';
interface EventDates {
  eventDate: string;
}

interface Event {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  dates: EventDates;
  color?: string;
}

export const visitBloomFormatter = (data: Event[]) => {
  const timeZone = 'America/Indiana/Indianapolis';
  return data.map((event) => {
    const bloomingtonTime = toZonedTime(event.dates.eventDate, timeZone);
    const formattedDate = format(bloomingtonTime, 'yyyy-MM-dd');
    const color = 'red';
    return {
      title: event.title,
      start: `${formattedDate} ${event.startTime}`,
      end: `${formattedDate} ${event.endTime}`,
      description: event.description
        .replace(/<\/?[^>]+(>|$)/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&'),
      color,
    };
  });
};
