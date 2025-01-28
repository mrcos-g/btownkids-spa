import { FC } from 'react';

const EventFilter: FC = () => {
  return (
    <div className="flex space-x-4 p-4">
      <div>
        <h3>Filter by Source</h3>
        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span>Source 1</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span>Source 2</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span>Source 3</span>
        </label>
      </div>
    </div>
  );
};

export default EventFilter;
