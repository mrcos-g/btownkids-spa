'use client';
import { FC } from 'react';
import { useEventSourceContext, EventSource } from '@/context/EventSourceContext';

const EventFilter: FC = () => {
  const { selectedSources, setStateSelectedSource } = useEventSourceContext();

  const sources = Object.values(EventSource);

  return (
    <div className="flex flex-col p-4 md:flex-row md:space-x-4">
      <div>
        <div>
          <h3 className="text-lg md:text-xl">Filter by Source</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sources.map((source) => {
            return (
              <label key={source} className="mx-2 flex items-center space-x-4">
                <input
                  type="checkbox"
                  value={source}
                  checked={selectedSources.includes(source)}
                  onChange={() => setStateSelectedSource(source)}
                />
                <span className="text-sm md:text-base">{source}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
