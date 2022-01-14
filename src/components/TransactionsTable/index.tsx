import editIcon from "../../assets/edit.png";

import { useUsers } from "../../hooks/useUsers";
import { Container } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function TransactionsTable({ onOpenNewTransactionModal }: HeaderProps) {
  const {users, setId} = useUsers();

  function editUser(id: number) {
    setId(id);
    onOpenNewTransactionModal();
  }

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Data Nascimento</th>
            <th>Imagem</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user?.codigo}</td>
              <td>{user?.nome}</td>
              <td>
              {user.data_nascimento !== undefined ?  Intl.DateTimeFormat('pt-BR').format(
                new Date(user?.data_nascimento)
                ): ''}
              </td>
              <td>{user?.image}</td>
              <td><button onClick={() => editUser(user.id)}><img src={editIcon} alt="Edit" /></button></td>
          </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}