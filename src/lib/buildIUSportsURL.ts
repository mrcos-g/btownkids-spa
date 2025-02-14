import { getNextMonthOrFirstOfCurrent } from '@/utils/dateUtils';

export const buildIUSportsURL = (date: string) => {
  const urlDate = getNextMonthOrFirstOfCurrent(date);

  const userTimezone = 'America/Indianapolis';

  const templateVars = [
    'id',
    'time',
    'title_link',
    'summary',
    'location',
    'until',
    'repeats',
    'href',
  ];

  const widgetConfig = {
    hide_repeats: true,
    show_locations: false,
    use_tag_classes: false,
    search_all_events_only: true,
    use_modular_templates: true,
    modular: true,
    hide_local_timezone: true,
    enable_home_view: true,
    group: 'IU Bloomington Athletics',
  };

  const baseUrl = `https://events.iu.edu/live/calendar/view/month/categories/Sporting%20events/audience/Families/date/${urlDate}`;

  const params = new URLSearchParams();
  params.append('user_tz', userTimezone);
  params.append('template_vars', templateVars.join(','));

  let widgetXML = `<widget type="events_calendar">`;
  for (const [key, value] of Object.entries(widgetConfig)) {
    widgetXML += `<arg id="${key}">${value}</arg>`;
  }
  widgetXML += `</widget>`;

  params.append('syntax', widgetXML);

  return `${baseUrl}?${params.toString()}`;
};
