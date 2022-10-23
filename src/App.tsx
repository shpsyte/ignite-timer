import { Button } from './components/Button';
import { ThemeProvider } from 'styled-components';
import { dark } from './styles/themes/light';
import { GlobalStyle } from './styles/global';
import { Router } from './components/Router';
import { BrowserRouter } from 'react-router-dom';
import { CycleContextProvider } from './Context/CyclesContext';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={dark}>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  );
}
