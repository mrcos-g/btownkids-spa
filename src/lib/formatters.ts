import { toZonedTime, format } from 'date-fns-tz';

interface McplEvent {
  title: string;
  event_start: string;
  event_end: string;
  description: string;
  url: string;
}

interface BloomEventDates {
  eventDate: string;
}

interface VisitBloomEvent {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  dates: BloomEventDates;
  color?: string;
  url: string;
}

const normalizeUrl = (url: string) => {
  return url.replace(/([^:])\/{2,}/g, '$1/');
};

export const mcplFormatter = (data: McplEvent[]) => {
  console.log(data);
  return data.map((event) => {
    return {
      title: event.title,
      start: event.event_start,
      end: event.event_end,
      description: event.description,
      url: normalizeUrl(event.url),
    };
  });
};

export const visitBloomFormatter = (data: VisitBloomEvent[]) => {
  const timeZone = 'America/Indiana/Indianapolis';
  const baseURL = 'https://www.visitbloomington.com';
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
      url: `${baseURL}${event.url}`,
    };
  });
};
