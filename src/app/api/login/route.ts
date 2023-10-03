import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { createHash } from 'crypto';

export async function POST(request: NextRequest) {
    const body = await request.formData();

    const username = body.get('username') as string;
    const password = body.get('password') as string;
    const hashedPassword = createHash('sha256').update(password).digest('hex');

    const user = await prisma.user.findFirst({
        where: {
            username: username,
            password: hashedPassword,
        },
    });

    if (user) {
        return NextResponse.json({ user });
    }

    return NextResponse.json(
        { message: 'Username or password incorrect!' },
        { status: 400 }
    );
}
