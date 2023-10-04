'use client';

import { AuthContext } from '@/context/AuthContext';
import { cinema, Prisma } from '@prisma/client';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useState } from 'react';

type CinemaWithMovies = Prisma.cinemaGetPayload<{ include: { movies: true } }>;

export default function Home() {
    const [cinemas, setCinemas] = useState<CinemaWithMovies[]>([]);
    const { user } = useContext(AuthContext);

    const fetchCinemas = useCallback(
        async function fetchCinemas() {
            const response = await fetch(`/api/cinema?city=${user?.city}`, {
                method: 'GET',
            });

            if (!response.ok) {
                return;
            }

            const fetchedCinemas = await response.json();

            setCinemas(fetchedCinemas.cinemas as CinemaWithMovies[]);
        },
        [user?.city]
    );

    useEffect(() => {
        fetchCinemas();
    }, [fetchCinemas]);

    if (cinemas.length === 0) {
        return <p>{`No cinemas found for city: ${user?.city}`}</p>;
    }

    return (
        <div style={{ display: 'flex', gap: 16, padding: 16 }}>
            {cinemas.map((cinema) => {
                return (
                    <div
                        key={cinema.id}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            borderStyle: 'solid',
                            borderWidth: 0,
                            borderColor: 'white',
                            borderRadius: 16,
                            minWidth: 250,
                            gap: 4,
                            backgroundColor: '#292929',
                            boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
                        }}
                    >
                        <h1
                            style={{
                                backgroundColor: '#ff4f42',
                                padding: 8,
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16,
                            }}
                        >
                            {cinema.name}
                        </h1>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4,
                                padding: 12,
                            }}
                        >
                            {cinema.movies.map((movie) => {
                                return (
                                    <Link
                                        key={movie.id}
                                        href={`/movie/${movie.id}`}
                                        style={{ fontSize: 20 }}
                                    >
                                        {movie.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
