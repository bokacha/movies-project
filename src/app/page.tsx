'use client';

import { AuthContext } from '@/context/AuthContext';
import { cinema, Prisma } from '@prisma/client';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

const CITY = 'Banja Luka';

type CinemaWithMovies = Prisma.cinemaGetPayload<{ include: { movies: true } }>;

export default function Home() {
    const [cinemas, setCinemas] = useState<CinemaWithMovies[]>([]);
    const {} = useContext(AuthContext);

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

    return (
        <div>
            {cinemas.map((cinema) => {
                return (
                    <div key={cinema.id}>
                        <h1>{cinema.name}</h1>
                        {cinema.movies.map((movie) => {
                            return (
                                <Link
                                    key={movie.id}
                                    href={`/movie/${movie.id}`}
                                >
                                    {movie.name}
                                </Link>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
