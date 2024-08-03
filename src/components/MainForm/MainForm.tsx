import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { schema, defaultValues } from '../../types/Schema';
import { Tab, Tabs } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { StyledEditButton, StyledSaveButton, StyledTabListWrapper, StyledTabsWrapper } from './MainForm.styled';

const MainForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues,
  });

  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <FormProvider {...methods}>
      <form>
        <StyledTabsWrapper>
          <TabContext value={value}>
            <StyledTabListWrapper>
              <TabList onChange={handleChange}>
                <Tab label="Контактная информация" value="1" />
                <Tab label="Проекты" value="2" />
              </TabList>
            </StyledTabListWrapper>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </StyledTabsWrapper>
        <StyledSaveButton type="submit" variant="contained">
          Сохранить
        </StyledSaveButton>

        <StyledEditButton type="button">Редактировать</StyledEditButton>
      </form>
    </FormProvider>
  );
};

export default MainForm;
