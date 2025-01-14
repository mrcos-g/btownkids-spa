interface Event {
  title: string;
  event_start: string;
  event_end: string;
  description: string;
  url: string;
}

const normalizeUrl = (url: string) => {
  return url.replace(/([^:])\/{2,}/g, '$1/');
};

export const mcplFormatter = (data: Event[]) => {
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
