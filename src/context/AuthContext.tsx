'use client';

import { user } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useEffect, useState } from 'react';

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
    const router = useRouter();

    async function login(username: string, password: string) {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const response = await fetch('/api/login', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            return false;
        }

        const userJson = await response.json();

        setUser(userJson.user as user);

        return true;
    }

    function logout() {
        setUser(null);
    }

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [router, user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}
