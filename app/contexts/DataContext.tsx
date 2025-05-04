import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ProjectDto } from '../dtos/project-dto';

// Define the context type
type DataContextType = {
  projectInMemory: ProjectDto | null;
  setProjectInMemory: React.Dispatch<React.SetStateAction<ProjectDto | null>>;
  resetProjectInMemory: () => void;
};

// Create the context with default values
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
 
  const [projectInMemory, setProjectInMemory] = useState<ProjectDto | null>(null);
 
  useEffect(() => {
    const savedData = localStorage.getItem('projectInMemory');
    if (savedData) {
      setProjectInMemory(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (projectInMemory !== null) {
      localStorage.setItem('projectInMemory', JSON.stringify(projectInMemory));
    }
  }, [projectInMemory]);

  const resetProjectInMemory = () => {
    setProjectInMemory(null);
 
  };

  return (
    <DataContext.Provider value={{
      projectInMemory, setProjectInMemory, resetProjectInMemory
    }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the DtoContext
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
