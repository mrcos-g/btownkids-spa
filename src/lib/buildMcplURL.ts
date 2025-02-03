export const buildMcplURL = (firstDayOfMonth: string, remainingDaysInMonth: number) => {
  const baseURL = 'https://calendar.mcpl.info/eeventcaldata';
  const queryParams = {
    private: false,
    date: firstDayOfMonth,
    days: remainingDaysInMonth,
    ages: ["Children's"],
  };

  const encodeQueryParams = encodeURIComponent(JSON.stringify(queryParams));
  return `${baseURL}?event_type=0&req=${encodeQueryParams}`;
};
