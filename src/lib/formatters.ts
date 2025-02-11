import { toZonedTime, format } from 'date-fns-tz';

export enum EventSource {
  ELLETTSVILLE = 'Ellettsville Branch (MCPL)',
  SOUTHWEST = 'Southwest Branch (MCPL)',
  DOWNTOWN = 'Downtown Library (MCPL)',
  VISIT_BLOOMINGTON = 'VisitBloomington',
}

interface McplEvent {
  title: string;
  event_start: string;
  event_end: string;
  description: string;
  url: string;
  location_id: string;
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

const getMcplLocation = (locationId: string) => {
  switch (locationId) {
    case '3696':
      return { location: EventSource.ELLETTSVILLE, color: 'green' };
    case '3697':
      return { location: EventSource.SOUTHWEST, color: 'purple' };
    case '3648':
      return { location: EventSource.DOWNTOWN, color: '#3788d8' };
    default:
      return { location: 'Unknown Location', color: 'gray' };
  }
};

const normalizeUrl = (url: string) => {
  return url.replace(/([^:])\/{2,}/g, '$1/');
};

export const mcplFormatter = (data: McplEvent[]) => {
  return data.map((event) => {
    const { location, color } = getMcplLocation(event.location_id);

    return {
      title: event.title,
      start: event.event_start,
      end: event.event_end,
      description: event.description,
      url: normalizeUrl(event.url),
      location,
      source: location,
      color,
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
      source: 'VisitBloomington',
    };
  });
};
