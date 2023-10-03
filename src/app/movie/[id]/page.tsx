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

    const fetchMovie = useCallback(
        async function fetchMovie() {
            const response = await fetch(`/api/movie?id=${params.params.id}`, {
                method: 'GET',
            });

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

    if (!movie) {
        return <p>{`Movie with id:${params.params.id} not found`}</p>;
    }

    return <h1>{movie.name}</h1>;
}
