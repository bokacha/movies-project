'use client';

import { movie } from '@prisma/client';
import { useCallback, useEffect, useState } from 'react';

interface MoviePageParams {
    params: {
        id: string;
    };
}

export default function MoviePage(params: MoviePageParams) {
    const [movie, setMovie] = useState<movie>();
    const [fetching, setFetching] = useState(false);

    const fetchMovie = useCallback(
        async function fetchMovie() {
            setFetching(true);

            const response = await fetch(`/api/movie?id=${params.params.id}`, {
                method: 'GET',
            });

            setFetching(false);

            if (!response.ok) {
                return;
            }

            const fetchedMovie = await response.json();

            setMovie(fetchedMovie.movie as movie);
        },
        [params.params.id]
    );

    useEffect(() => {
        fetchMovie();
    }, [fetchMovie]);

    if (fetching) {
        return <p>Fetching movie...</p>;
    }

    if (!movie) {
        return <p>{`Movie with id:${params.params.id} not found`}</p>;
    }

    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                padding: 16,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 400,
                    gap: 16,
                    backgroundColor: '#292929',
                    padding: 16,
                    borderRadius: 16,
                    boxShadow: '5px 5px 5px 0px rgba(0,0,0,0.75)',
                }}
            >
                <h1 style={{ color: '#ff4f42' }}>{movie.name}</h1>
                <p>{movie.description}</p>
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                >
                    <p>{`Duration: ${movie.runtime}`}</p>
                    <p>{`Year: ${movie.year}`}</p>
                </div>
            </div>
        </div>
    );
}
