import { ReactNode } from 'react';
import Logo from '../../assets/Logo.svg';
import { Timer, Scroll } from 'phosphor-react'
import { HeaderContainer } from './styles';
import { NavLink } from 'react-router-dom'

interface HeaderProps {
  children?: ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <HeaderContainer>
      <img src={Logo} alt="Logo" />
      <nav>
        <NavLink title="Timer" to="/Home"><Timer size={24} /></NavLink>
        <NavLink title="History" to="/history">
          <Scroll size={24} />
        </NavLink>
      </nav>
      {/* {children} */}
    </HeaderContainer>
  );
}
