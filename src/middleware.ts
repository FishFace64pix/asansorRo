import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './lib/i18n/config';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Handle Localized API Requests (The fix for 404)
    // If request is /ro/api/..., rewrite it to /api/...
    const localeApiMatch = pathname.match(/^\/[a-z]{2}(\/api\/.*)/);
    if (localeApiMatch) {
        const newUrl = request.nextUrl.clone();
        newUrl.pathname = localeApiMatch[1];
        return NextResponse.rewrite(newUrl);
    }

    // 2. Security & Auth Check (Admin + API)
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
        // Public paths
        if (
            pathname === '/admin/login' ||
            pathname.startsWith('/api/auth') ||
            (pathname.startsWith('/api/contact') && request.method === 'POST')
        ) {
            return NextResponse.next();
        }

        const token = request.cookies.get('admin_session')?.value;
        const payload = token ? await verifyToken(token) : null;
        const isAuthenticated = !!payload;

        if (!isAuthenticated) {
            // For API requests, return 401
            if (pathname.startsWith('/api')) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
            // For Admin pages, redirect to login
            const url = request.nextUrl.clone();
            url.pathname = '/admin/login';
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    // 3. Locale Redirects (Standard pages)
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Redirect to default locale if no locale is present
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, static files, etc.)
        // We MUST NOT exclude 'admin' or 'api' here, because we want middleware to run on them
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*|images|videos).*)',
    ],
};
