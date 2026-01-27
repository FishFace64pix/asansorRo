import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signToken } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        // Simple password check using env variable
        // Default to 'admin123' if not set
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

        if (password === ADMIN_PASSWORD) {
            // Set JWT cookie valid for 1 day
            const token = await signToken({ role: 'admin' });
            const cookieStore = await cookies();
            cookieStore.set('admin_session', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 1 day
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
