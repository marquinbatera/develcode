import { useState } from 'react';
import Modal from 'react-modal';
import { GlobalStyle } from './assets/styles/global';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { UserProvider } from './hooks/useUsers';

Modal.setAppElement('#root');

export function App() {
  
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <UserProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
        <Dashboard onOpenNewTransactionModal={handleOpenNewTransactionModal} />
        <NewTransactionModal 
          isOpen={isNewTransactionModalOpen} 
          onRequestClose={handleCloseNewTransactionModal} 
        />  
      <GlobalStyle />
    </UserProvider>
  );
}
