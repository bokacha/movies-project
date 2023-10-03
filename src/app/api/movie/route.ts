import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request: NextRequest) {
    const queryParams = request.nextUrl.searchParams;
    const id = queryParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Id is missing' }, { status: 400 });
    }

    const movie = await prisma.movie.findFirst({
        where: {
            id: Number(id),
        },
    });

    if (!movie) {
        return NextResponse.json(
            { message: 'Movie not found.' },
            { status: 400 }
        );
    }

    return NextResponse.json({ movie });
}
