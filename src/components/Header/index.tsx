import { useUsers } from "../../hooks/useUsers";

import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {

  const { setId } = useUsers();
  
  async function handleNewUser() {
    await setId(0);
    await onOpenNewTransactionModal();
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="Develcode" />
        <button type='button' onClick={handleNewUser}>Novo Usuário</button>
        
      </Content>
    </Container>
  )
}