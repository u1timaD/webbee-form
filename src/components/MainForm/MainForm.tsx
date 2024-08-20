import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { schema, defaultValues } from '../../types/Schema';
import { Button, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useContext, useState } from 'react';
import { StyledButtonWrapper, StyledTabListWrapper, StyledTabsWrapper } from './MainFormStyled';
import UserInfoTab from '../UserInfoTab/UserInfoTab';
import UserProjectsTab from '../UserProjectsTab/UserProjectsTab';
import { ReadOnlyFormContext, SetReadOnlyFormContext } from '../../provider/MainFormProvider';
import ValidProjectsProvider from '../../provider/ProjectFormProvider';

const MainForm = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues,
  });

  const readOnlyForm = useContext(ReadOnlyFormContext);
  const setReadOnlyForm = useContext(SetReadOnlyFormContext);
  const [tabShow, setTabShow] = useState('2');
  const [alertTabInfo, setAlertTabInfo] = useState(false);
  const [alertTabProjects, setAlertTabProjects] = useState(false);

  const handleChangeTabs = (_event: React.SyntheticEvent, newValue: string) => {
    setTabShow(newValue);
  };

  const onSubmit = (data) => {
    setReadOnlyForm(true);
    console.log(data);
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
          <ValidProjectsProvider>
            <TabContext value={tabShow}>
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
          </ValidProjectsProvider>
        </StyledTabsWrapper>
        <StyledButtonWrapper>
          <Button type="submit" variant="contained" disabled={readOnlyForm} onClick={handleClickSave}>
            Сохранить
          </Button>
          {readOnlyForm && <Button onClick={() => setReadOnlyForm(false)}>Редактировать</Button>}
        </StyledButtonWrapper>
      </form>
    </FormProvider>
  );
};

export default MainForm;
