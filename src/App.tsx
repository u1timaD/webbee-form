import MainForm from './components/MainForm/MainForm';
import { ThemeProvider } from '@emotion/react';
import theme from './theme.tsx';
import MainFormProvider from './provider/MainFormProvider.tsx';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainFormProvider>
        <MainForm />
      </MainFormProvider>
    </ThemeProvider>
  );
}

export default App;
