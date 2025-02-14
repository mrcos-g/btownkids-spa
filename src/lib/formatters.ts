import { toZonedTime, format } from 'date-fns-tz';

export enum EventSource {
  ELLETTSVILLE = 'Ellettsville Branch (MCPL)',
  SOUTHWEST = 'Southwest Branch (MCPL)',
  DOWNTOWN = 'Downtown Library (MCPL)',
  VISIT_BLOOMINGTON = 'VisitBloomington',
  IU_SPORTS = 'IU Sports',
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

interface IUSportEvent {
  id: string;
  ts_start: number;
  tz: string;
  tz_abbrv: string;
  tz_offset: number;
  tz_format: string;
  href: string;
  title: string;
  status: string;
  location: string;
  summary: string;
  repeats: string;
  user_offset: number;
  user_abbrv: string;
}

interface IUEventData {
  [date: string]: IUSportEvent[];
}

interface FormattedEvent {
  title: string;
  url: string;
  date: string;
  start: string;
  source: string;
  color: string;
  location: string;
  allDay: boolean;
}

type FormattedIUSportsEvent = FormattedEvent[];

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

function convertToEST(timestamp: number): string {
  const timeZone = 'America/New_York';
  const date = toZonedTime(timestamp * 1000, timeZone);

  return format(date, 'yyyy-MM-dd HH:mm:ss', { timeZone });
}

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

export const IUSportsFormatter = (data: IUEventData): FormattedIUSportsEvent => {
  const formattedEvents: FormattedIUSportsEvent = [];
  const baseURL = 'https://events.iu.edu/hoosiers/';
  const color = 'gray';

  for (const [date, events] of Object.entries(data)) {
    events.forEach((event) => {
      if (event.location.includes('Bloomington')) {
        formattedEvents.push({
          title: event.title,
          url: `${baseURL}${event.href}`,
          date,
          start: convertToEST(event.ts_start),
          source: 'IU Sports',
          color,
          location: event.location,
          allDay: false,
        });
      }
    });
  }

  return formattedEvents;
};
