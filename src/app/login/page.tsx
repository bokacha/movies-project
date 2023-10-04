'use client';

import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useState } from 'react';

export default function LoginPage() {
    const [isFailedLogin, setIsFailedLogin] = useState(false);
    const router = useRouter();
    const { login } = useContext(AuthContext);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        const loginSuccess = await login(username, password);

        if (!loginSuccess) {
            setIsFailedLogin(true);
            return;
        }

        router.push('/');
    }

    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                marginTop: 64,
            }}
        >
            <form
                onSubmit={onSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
                <label>Username: </label>
                <input type="text" name="username" />
                <label>Password: </label>
                <input type="password" name="password" />
                <button type="submit" style={{ fontSize: 16 }}>
                    Login
                </button>
                {isFailedLogin === true && (
                    <p color="red">Incorrect username or password.</p>
                )}
            </form>
        </div>
    );
}
