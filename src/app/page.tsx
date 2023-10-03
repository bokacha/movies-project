'use client';

import { cinema } from '@prisma/client';
import { useEffect, useState } from 'react';

const CITY = 'Prijedor';

export default function Home() {
    const [cinemas, setCinemas] = useState<cinema[]>([]);

    async function fetchCinemas() {
        const response = await fetch(`/api/cinema?city=${CITY}`, {
            method: 'GET',
        });

        if (!response.ok) {
            return;
        }

        const fetchedCinemas = await response.json();
        console.log(fetchedCinemas);

        setCinemas(fetchedCinemas.cinemas as cinema[]);
    }

    useEffect(() => {
        fetchCinemas();
    }, []);

    if (cinemas.length === 0) {
        return <p>{`No cinemas found for city: ${CITY}`}</p>;
    }

    return <h1>{`Available cinemas: ${cinemas.length}`}</h1>;
}
