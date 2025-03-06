import { parseISO, endOfMonth, differenceInDays, addMonths, startOfMonth } from 'date-fns';
import { toZonedTime, format } from 'date-fns-tz';

export const startOfNextMonthEncoded = (date: Date): string => {
  const firstDayOfFollowingMonth = startOfMonth(addMonths(date, 1));

  const followingMonthInUTC = toZonedTime(firstDayOfFollowingMonth, 'UTC');
  followingMonthInUTC.setUTCHours(5, 0, 0, 0);

  return followingMonthInUTC.toISOString();
};

export const getNextMonthOrFirstOfCurrent = (dateString: string): string => {
  const date = parseISO(dateString);
  const lastDayOfMonth = endOfMonth(date);
  const daysRemaining = differenceInDays(lastDayOfMonth, date);
  const dateFormat = 'yyyyMMdd';

  if (daysRemaining < 10) {
    const nextMonth = addMonths(date, 1);
    return format(startOfMonth(nextMonth), dateFormat);
  } else {
    return format(startOfMonth(date), dateFormat);
  }
};

export const removeDateFromTitle = (title: string): string => {
  return title.replace(/^\d{1,2}\/\d{1,2} \d{1,2}:\d{2} [APM]{2} /, '').trim();
};

export const convertToEasternTime = (
  dateTime: string,
): { day: string; date: string; time: string } => {
  const timeZone = 'America/Indiana/Indianapolis';

  const date = parseISO(dateTime);

  const zonedDate = toZonedTime(date, timeZone);

  const formattedDateObj = {
    day: format(zonedDate, 'EEEE', { timeZone }),
    date: format(zonedDate, 'MMMM d, yyyy', { timeZone }),
    time: format(zonedDate, 'hh:mm:ss a', { timeZone }),
  };

  return formattedDateObj;
};
