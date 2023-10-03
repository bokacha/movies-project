'use client';

import { AuthContext } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { Fragment, ReactNode, useContext } from 'react';

type AuthGuardProps = { children: ReactNode };

const PUBLIC_ROUTES: string[] = ['/login'];

export function AuthGuard(props: AuthGuardProps) {
    const { user } = useContext(AuthContext);
    const path = usePathname();

    if (!user && !PUBLIC_ROUTES.includes(path)) {
        return <p>Not authorized.</p>;
    }

    return <Fragment>{props.children}</Fragment>;
}
