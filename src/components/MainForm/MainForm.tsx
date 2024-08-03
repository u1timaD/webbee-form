import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { schema, defaultValues } from '../../types/Schema';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { StyledEditButton, StyledSaveButton, StyledTabListWrapper, StyledTabsWrapper } from './MainForm.styled';
import UserInfoTab from '../UserInfoTab/UserInfoTab';

const MainForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const [value, setValue] = useState('1');
  const [readOnlyForm, setReadOnlyForm] = useState(false);

  const handleChangeTabs = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleChangeReadOnly = () => {
    setReadOnlyForm(false);
  };

  const onSubmit = (data) => {
    setReadOnlyForm(true);

  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StyledTabsWrapper>
          <TabContext value={value}>
            <StyledTabListWrapper>
              <TabList onChange={handleChangeTabs}>
                <Tab label="Контактная информация" value="1" />
                <Tab label="Проекты" value="2" />
              </TabList>
            </StyledTabListWrapper>
            <TabPanel value="1">
              <UserInfoTab readOnlyForm={readOnlyForm} />
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
          </TabContext>
        </StyledTabsWrapper>
        <StyledSaveButton type="submit" variant="contained">
          Сохранить
        </StyledSaveButton>

        {readOnlyForm && (
          <StyledEditButton type="button" onClick={handleChangeReadOnly}>
            Редактировать
          </StyledEditButton>
        )}
      </form>
    </FormProvider>
  );
};

export default MainForm;
