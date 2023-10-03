'use client';

import { FormEvent } from 'react';

export default function LoginPage() {
    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const response = await fetch('/api/login', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            console.log(response);
            return;
        }

        const user = await response.json();
    }

    return (
        <form onSubmit={onSubmit}>
            <label>Username: </label>
            <input type="text" name="username" />
            <label>Password: </label>
            <input type="password" name="password" />
            <button type="submit">Login</button>
        </form>
    );
}
