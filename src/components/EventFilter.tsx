import { FC } from 'react';

const EventFilter: FC = () => {
  const sources = [
    'Ellettsville Branch (MCPL)',
    'South West Branch (MCPL)',
    'Downtown Library',
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
                <input type="checkbox" value={source} />
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
