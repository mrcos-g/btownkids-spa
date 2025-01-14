import { startOfMonth, addMonths } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export const startOfNextMonthEncoded = (date: Date): string => {
  const firstDayOfFollowingMonth = startOfMonth(addMonths(date, 1));

  const followingMonthInUTC = toZonedTime(firstDayOfFollowingMonth, 'UTC');
  followingMonthInUTC.setUTCHours(5, 0, 0, 0);

  return followingMonthInUTC.toISOString();
};
