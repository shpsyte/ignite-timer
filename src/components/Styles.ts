import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'error'

interface ButtonProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonProps>`
  width: 100px;
  height: 50px;
  border-radius: 5px;
  border: 0;
  margin: 10px;

  background-color: ${({ theme }) => theme['green-300']};
  color: ${({ theme }) => theme.white};
`
