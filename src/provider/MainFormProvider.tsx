import { createContext, useState } from 'react';
import { MainFormProviderProps, ReadOnlyFormContextType, SetReadOnlyFormContextType } from './provider.types';

export const ReadOnlyFormContext = createContext<ReadOnlyFormContextType>(false);
export const SetReadOnlyFormContext = createContext<SetReadOnlyFormContextType>(() => {});

const MainFormProvider = ({ children }: MainFormProviderProps) => {
  const [readOnlyForm, setReadOnlyForm] = useState<boolean>(false);

  return (
    <ReadOnlyFormContext.Provider value={readOnlyForm}>
      <SetReadOnlyFormContext.Provider value={setReadOnlyForm}>{children}</SetReadOnlyFormContext.Provider>
    </ReadOnlyFormContext.Provider>
  );
};

export default MainFormProvider;
