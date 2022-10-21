import { Button } from './components/Button'
import { ThemeProvider } from 'styled-components'
import { dark } from './styles/themes/light'
import { GlobalStyle } from './styles/global'
import { Router } from './components/Router'
import { BrowserRouter } from 'react-router-dom'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={dark}>
          <Router />
        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}
