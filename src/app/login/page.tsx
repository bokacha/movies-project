'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
    const [isFailedLogin, setIsFailedLogin] = useState(false);
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const response = await fetch('/api/login', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            setIsFailedLogin(true);
            return;
        }

        const user = await response.json();

        router.push('/');
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Username: </label>
            <input type="text" name="username" />
            <label>Password: </label>
            <input type="password" name="password" />
            <button type="submit">Login</button>
            {isFailedLogin === true && (
                <p color="red">Incorrect username or password.</p>
            )}
        </form>
    );
}
