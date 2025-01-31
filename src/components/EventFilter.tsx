import { useState, FC } from 'react';

interface EventFilterProps {
  onFilterChange: (selectedSources: string[]) => void;
}

export enum EventSource {
  ELLETTSVILLE = 'Ellettsville Branch (MCPL)',
  SOUTHWEST = 'Southwest Branch (MCPL)',
  DOWNTOWN = 'Downtown Library (MCPL)',
  VISIT_BLOOMINGTON = 'VisitBloomington',
}

const EventFilter: FC<EventFilterProps> = ({ onFilterChange }) => {
  const [selectedSources, setSelectedSources] = useState<string[]>(Object.values(EventSource));

  const handleSourceChange = (source: string) => {
    const currentlySelectedSources = selectedSources.includes(source)
      ? selectedSources.filter((selectedSource) => selectedSource !== source)
      : [...selectedSources, source];
    setSelectedSources(currentlySelectedSources);
    onFilterChange(currentlySelectedSources);
  };

  const sources = Object.values(EventSource);

  return (
    <div className="flex flex-col p-4 md:flex-row md:space-x-4">
      <div>
        <div>
          <h3 className="text-lg md:text-xl">Filter by Source</h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sources.map((source) => {
            return (
              <label key={source} className="mx-2 flex items-center space-x-4">
                <input
                  type="checkbox"
                  value={source}
                  checked={selectedSources.includes(source)}
                  onChange={() => handleSourceChange(source)}
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
