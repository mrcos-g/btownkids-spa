import { useState, FC } from 'react';

interface EventFilterProps {
  onFilterChange: (selectedSources: string[]) => void;
}

const EventFilter: FC<EventFilterProps> = ({ onFilterChange }) => {
  const [selectedSources, setSelectedSources] = useState<string[]>([
    'Ellettsville Branch (MCPL)',
    'Southwest Branch (MCPL)',
    'Downtown Library (MCPL)',
    'VisitBloomington',
  ]);

  const handleSourceChange = (source: string) => {
    const currentlySelectedSources = selectedSources.includes(source)
      ? selectedSources.filter((selectedSource) => selectedSource !== source)
      : [...selectedSources, source];
    setSelectedSources(currentlySelectedSources);
    onFilterChange(currentlySelectedSources);
  };

  const sources = [
    'Ellettsville Branch (MCPL)',
    'Southwest Branch (MCPL)',
    'Downtown Library (MCPL)',
    'VisitBloomington',
  ];
  return (
    <div className="flex space-x-4 p-4">
      <div>
        <div>
          <h3>Filter by Source</h3>
        </div>
        <div className="flex">
          {sources.map((source) => {
            return (
              <label key={source} className="mx-2 flex items-center space-x-4">
                <input
                  type="checkbox"
                  value={source}
                  checked={selectedSources.includes(source)}
                  onChange={() => handleSourceChange(source)}
                />
                <span>{source}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventFilter;
