import { useState } from 'react';
import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  
  

  return (
    <Container>
      <Content>
        <img src={logo} alt="Develcode" />
        <button type='button' onClick={onOpenNewTransactionModal}>Novo Usuário</button>
        
      </Content>
    </Container>
  )
}