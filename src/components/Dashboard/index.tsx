// import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";
import { Container } from "./styles";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Dashboard({onOpenNewTransactionModal}: HeaderProps) {
  return (
    <Container>
      <TransactionsTable onOpenNewTransactionModal={onOpenNewTransactionModal} />
    </Container>
  );
}