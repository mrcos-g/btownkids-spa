interface Event {
  title: string;
  event_start: string;
  event_end: string;
  description: string;
}

export const mcplFormatter = (data: Event[]) => {
  return data.map((event) => {
    return {
      title: event.title,
      start: event.event_start,
      end: event.event_end,
      description: event.description,
    };
  });
};
