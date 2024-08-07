import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { schema, defaultValues } from '../../types/Schema';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { StyledEditButton, StyledSaveButton, StyledTabListWrapper, StyledTabsWrapper } from './MainFormStyled';
import UserInfoTab from '../UserInfoTab/UserInfoTab';
import UserProjectsTab from '../UserProjectsTab/UserProjectsTab';
import { useFormStore } from '../../store/store';

const MainForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
    defaultValues,
  });

  const [value, setValue] = useState('2');
  const [alertTabInfo, setAlertTabInfo] = useState(false);
  const [alertTabProjects, setAlertTabProjects] = useState(false);

  const { readOnlyForm, activateReadOnlyForm, deactivateReadOnlyForm } = useFormStore();

  const handleChangeTabs = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onSubmit = () => {
    activateReadOnlyForm();
  };

  const handleClickSave = async () => {
    const isValid = await methods.trigger();
    const { errors } = methods.formState;

    setAlertTabInfo(Object.keys(errors).filter((item) => item !== 'projects').length > 0);

    setAlertTabProjects(!!errors.projects?.length);

    if (isValid) {
      methods.handleSubmit(onSubmit)();
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <StyledTabsWrapper>
          <TabContext value={value}>
            <StyledTabListWrapper>
              <TabList onChange={handleChangeTabs}>
                <Tab
                  label="Контактная информация"
                  value="1"
                  sx={{ border: alertTabInfo ? '1px solid #D32F2F' : 'none' }}
                />
                <Tab label="Проекты" value="2" sx={{ border: alertTabProjects ? '1px solid #D32F2F' : 'none' }} />
              </TabList>
            </StyledTabListWrapper>
            <TabPanel value="1">
              <UserInfoTab />
            </TabPanel>
            <TabPanel value="2">
              <UserProjectsTab />
            </TabPanel>
          </TabContext>
        </StyledTabsWrapper>
        <StyledSaveButton type="submit" variant="contained" disabled={readOnlyForm} onClick={handleClickSave}>
          Сохранить
        </StyledSaveButton>

        {readOnlyForm && <StyledEditButton onClick={deactivateReadOnlyForm}>Редактировать</StyledEditButton>}
      </form>
    </FormProvider>
  );
};

export default MainForm;
