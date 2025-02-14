import { parseISO, endOfMonth, differenceInDays, addMonths, startOfMonth, format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const startOfNextMonthEncoded = (date: Date): string => {
  const firstDayOfFollowingMonth = startOfMonth(addMonths(date, 1));

  const followingMonthInUTC = toZonedTime(firstDayOfFollowingMonth, 'UTC');
  followingMonthInUTC.setUTCHours(5, 0, 0, 0);

  return followingMonthInUTC.toISOString();
};

export function getNextMonthOrFirstOfCurrent(dateString: string): string {
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
}
