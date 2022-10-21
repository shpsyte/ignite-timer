import { ButtonContainer, ButtonVariant } from './Styles'

interface ButtonProps {
  variant?: ButtonVariant
}

export function Button({ variant = 'primary' }: ButtonProps) {
  return (
    <>
      <ButtonContainer variant={variant}>Click aqui</ButtonContainer>
    </>
  )
}
