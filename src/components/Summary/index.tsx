import incomeImg from '../../assets/entradas.svg';
import outcomeImg from '../../assets/saidas.svg';
import totalImg from '../../assets/total.svg';
import { useUsers } from '../../hooks/useUsers';
import { Container } from "./styles";

export function Summary() {
  const { users } = useUsers();

  // const summary = users.reduce((acc, user) => {
    
  //   if (user.type === 'deposit') {
  //     acc.deposit += user.amount;
  //     acc.total += user.amount;

  //   }else{
  //     acc.withdraw += user.amount;
  //     acc.total -= user.amount;
  //   }

  //   return acc;
    
  // }, {
  //   deposit: 0,
  //   withdraw: 0,
  //   total: 0
  // });

  // console.log(transactions);

  return (
    <Container>
      {/* <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt='Entradas'/>
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.deposit)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt='Saídas'/>
        </header>
        <strong> - {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.withdraw)}</strong>
      </div>
      <div className='highlight-background'>
        <header>
          <p>Total</p>
          <img src={totalImg} alt='Total'/>
        </header>
        <strong>{new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(summary.total)}</strong>
      </div> */}
    </Container>
  )
}