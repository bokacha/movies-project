import { user } from '@prisma/client';
import { createContext, ReactNode, useState } from 'react';

type AuthContextData = {
    user: user | null;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextData>({
    user: null,
    login: async () => {
        return false;
    },
    logout: () => {},
});

type AuthContextProviderProps = {
    children: ReactNode;
};

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<user | null>(null);

    async function login(username: string, password: string) {
        return false;
    }

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}
