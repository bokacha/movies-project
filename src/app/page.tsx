'use client';

import { cinema, Prisma } from '@prisma/client';
import { useEffect, useState } from 'react';

const CITY = 'Prijedor';

type CinemaWithMovies = Prisma.cinemaGetPayload<{ include: { movies: true } }>;

export default function Home() {
    const [cinemas, setCinemas] = useState<CinemaWithMovies[]>([]);

    async function fetchCinemas() {
        const response = await fetch(`/api/cinema?city=${CITY}`, {
            method: 'GET',
        });

        if (!response.ok) {
            return;
        }

        const fetchedCinemas = await response.json();

        setCinemas(fetchedCinemas.cinemas as CinemaWithMovies[]);
    }

    useEffect(() => {
        fetchCinemas();
    }, []);

    if (cinemas.length === 0) {
        return <p>{`No cinemas found for city: ${CITY}`}</p>;
    }

    return <h1></h1>;
}
