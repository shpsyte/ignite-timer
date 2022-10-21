import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 }

 body {
  background: ${({ theme }) => theme['gray-900']};
  color: ${({ theme }) => theme['gray-300']};
  -webkit-font-smoothing: antialiased;
 }

 :focus {
  outline: none;
  box-shadow: 0 0 0 2px ${({ theme }) => theme['green-300']};
 }

 body, input, button, textarea {
  font: 400 1rem Roboto, sans-serif;
 }


`
