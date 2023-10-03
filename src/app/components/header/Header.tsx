'use client';

import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export function Header() {
    const { logout, user } = useContext(AuthContext);

    return (
        <div>
            <h1>Cinema application</h1>
            {user && <button onClick={logout}>Logout</button>}
        </div>
    );
}
