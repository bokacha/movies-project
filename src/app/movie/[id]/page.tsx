interface MoviePageParams {
    params: {
        id: string;
    };
}

export default function MoviePage(params: MoviePageParams) {
    return <h1>{params.params.id}</h1>;
}
