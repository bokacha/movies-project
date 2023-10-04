'use client';

import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export function Header() {
    const { logout, user } = useContext(AuthContext);

    return (
        <div
            style={{
                display: 'flex',
                padding: 8,
            }}
        >
            <h1>Cinema application</h1>
            {user && (
                <div
                    style={{
                        display: 'flex',
                        marginLeft: 'auto',
                        gap: 8,
                        alignItems: 'center',
                    }}
                >
                    <p>{`${user.name} ${user.surname}`}</p>
                    <button
                        style={{ fontSize: 16, padding: 4 }}
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
