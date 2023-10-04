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
                paddingTop: 64,
            }}
        >
            <form
                onSubmit={onSubmit}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 32,
                    gap: 8,
                    borderStyle: 'solid',
                    borderRadius: 16,
                    borderWidth: 0,
                    height: 'fit-content',
                    backgroundColor: '#292929',
                    boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
                    width: 260,
                }}
            >
                <label>Username: </label>
                <input type="text" name="username" />
                <label>Password: </label>
                <input type="password" name="password" />
                <button
                    type="submit"
                    style={{
                        fontSize: 16,
                        marginTop: 16,
                        backgroundColor: '#ff4f42',
                        padding: 8,
                        border: 0,
                        borderRadius: 8,
                    }}
                >
                    Login
                </button>
                {isFailedLogin === true && (
                    <p style={{ color: 'red' }}>
                        Incorrect username or password.
                    </p>
                )}
            </form>
        </div>
    );
}
