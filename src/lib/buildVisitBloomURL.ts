export const fetchVisitBloomToken = async (): Promise<string> => {
  const tokenResponse = await fetch(
    'https://www.visitbloomington.com/plugins/core/get_simple_token/',
  );
  return await tokenResponse.text();
};

export const buildVisitBloomURL = (startDate: string, endDate: string, token: string): string => {
  const baseURL =
    'https://www.visitbloomington.com/includes/rest_v2/plugins_events_events_by_date/find/';

  const queryParams = {
    filter: {
      active: true,
      $and: [
        { 'categories.catId': { $in: ['26', '25', '29', '32', '23', '27', '28', '22', '24'] } },
      ],
      date_range: { start: { $date: startDate }, end: { $date: endDate } },
      'categories.catId': { $in: ['26'] },
    },
    options: {
      count: true,
      castDocs: false,
      fields: {
        _id: 1,
        title: 1,
        description: 1,
        location: 1,
        address1: 1,
        address2: 1,
        city: 1,
        zip: 1,
        date: 1,
        dates: 1,
        startDate: 1,
        endDate: 1,
        startTime: 1,
        endTime: 1,
        recurrence: 1,
        recurType: 1,
        media_raw: 1,
        recid: 1,
        url: 1,
        categories: 1,
        accountId: 1,
      },
      hooks: [],
      sort: { date: 1, rank: 1, title_sort: 1 },
    },
  };

  const encodeQueryParams = encodeURIComponent(JSON.stringify(queryParams));
  return `${baseURL}?json=${encodeQueryParams}&token=${token}`;
};
