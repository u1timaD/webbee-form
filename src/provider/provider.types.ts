import { Dispatch, SetStateAction, ReactNode } from 'react';

export type ReadOnlyFormContextType = boolean;
export type SetReadOnlyFormContextType = Dispatch<SetStateAction<boolean>>;

export interface MainFormProviderProps {
  children: ReactNode;
}

export type ValidProjectsContextType = number[];
export type SetValidProjectsContextType = React.Dispatch<React.SetStateAction<number[]>>;

export interface ProjectFormProviderProps {
  children: React.ReactNode;
}
