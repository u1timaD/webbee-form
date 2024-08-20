import { createContext, useState } from 'react';
import { ProjectFormProviderProps, SetValidProjectsContextType, ValidProjectsContextType } from './provider.types';

export const ValidProjectsContext = createContext<ValidProjectsContextType>([]);
export const SetValidProjectsContext = createContext<SetValidProjectsContextType>(() => {});

const ProjectFormProvider = ({ children }: ProjectFormProviderProps) => {
  const [validProjects, setValidProjects] = useState<number[]>([]);

  return (
    <ValidProjectsContext.Provider value={validProjects}>
      <SetValidProjectsContext.Provider value={setValidProjects}>{children}</SetValidProjectsContext.Provider>
    </ValidProjectsContext.Provider>
  );
};

export default ProjectFormProvider;
