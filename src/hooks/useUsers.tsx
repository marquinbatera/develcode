import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../servers/api';

interface userProps {
    id: number;
    codigo: string;
    nome: string;
    data_nascimento: string;
    image: string;
}

type UserInput = Omit<userProps, 'id'>

interface UsersProviderProps {
    children: ReactNode;
}

interface UsersContextData {
    users: userProps[];
    createUser: (user: UserInput) => Promise<void>;
    setId: (idUser: number) => void;
    idUser: number;
}

const UsersContext = createContext<UsersContextData>({} as UsersContextData);

export function UserProvider({ children }: UsersProviderProps) {
    const [users, setUsers] = useState<userProps[]>([]);
    const [idUser, setIdUser] = useState(0);

    useEffect(() => {
        api.get('/users').then(response => setUsers(response.data.users));
    }, []);

    async function createUser(userInput: UserInput) {
        console.log(userInput);
        const response = await api.post('/users', userInput);
        const { user } = response.data;
        
        // console.log(user);
        setUsers([
            ...users,
            user
        ])
    }

    function setId(idUser: number) {
        setIdUser(idUser);
    }

    return (
        <UsersContext.Provider value={{users, createUser, setId, idUser}}>
            {children}
        </UsersContext.Provider>
    );
}


export function useUsers() {
    const context = useContext(UsersContext);

    return context;
}