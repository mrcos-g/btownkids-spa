'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export enum EventSource {
  ELLETTSVILLE = 'Ellettsville Branch (MCPL)',
  SOUTHWEST = 'Southwest Branch (MCPL)',
  DOWNTOWN = 'Downtown Library (MCPL)',
  VISIT_BLOOMINGTON = 'VisitBloomington',
}

interface EventSourceContextType {
  selectedSources: string[];
  setStateSelectedSources: (source: string[]) => void;
}

interface EventSourceProviderProps {
  children: ReactNode;
}

const EventSourceContext = createContext<EventSourceContextType | undefined>(undefined);

export const EventSourceProvider = ({ children }: EventSourceProviderProps) => {
  const [selectedSources, setSelectedSources] = useState<string[]>(Object.values(EventSource));

  const setStateSelectedSources = (source: string) => {
    setSelectedSources((previousSelectedSources) =>
      previousSelectedSources.includes(source)
        ? previousSelectedSources.filter((selectedSource) => selectedSource !== source)
        : [...previousSelectedSources, source],
    );
  };

  return (
    <EventSourceContext.Provider value={{ selectedSources, setStateSelectedSources }}>
      {children}
    </EventSourceContext.Provider>
  );
};

export const useEventSourceContext = () => {
  const context = useContext(EventSourceContext);

  if (!context) {
    throw new Error('useEventSourceContext must be used within an EventSourceProvider');
  }

  return context;
};
