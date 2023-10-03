import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request: NextRequest) {
    const queryParams = request.nextUrl.searchParams;
    const city = queryParams.get('city');

    if (!city) {
        return NextResponse.json(
            { message: 'City not provided.' },
            { status: 400 }
        );
    }

    const cinemas = await prisma.cinema.findMany({
        where: {
            city: city,
        },
    });

    return NextResponse.json({ cinemas });
}
