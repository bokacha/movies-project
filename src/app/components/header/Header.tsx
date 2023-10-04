'use client';

import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';

export function Header() {
    const { logout, user } = useContext(AuthContext);

    return (
        <div
            style={{
                display: 'flex',
                padding: 16,
                backgroundColor: '#141414',
                boxShadow: '0px 5px 5px 0px rgba(0,0,0,0.5)',
            }}
        >
            <h1>Cinema Master</h1>
            {user && (
                <div
                    style={{
                        display: 'flex',
                        marginLeft: 'auto',
                        gap: 16,
                        alignItems: 'center',
                    }}
                >
                    <p>{`${user.name} ${user.surname}`}</p>
                    <button
                        style={{
                            fontSize: 16,
                            padding: 8,
                            backgroundColor: '#ff4f42',
                            border: 0,
                            borderRadius: 8,
                        }}
                        onClick={logout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
