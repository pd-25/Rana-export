import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'supersecretkey123'
);

async function verifyToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Admin routes ──────────────────────────────────────────────────────────
  const adminToken = request.cookies.get('admin_token')?.value;
  const isAdminVerified = await verifyToken(adminToken);

  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !isAdminVerified) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  if (pathname === '/admin/login' && isAdminVerified) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  // ── User routes ───────────────────────────────────────────────────────────
  const userSession = request.cookies.get('user_session')?.value;
  const isUserLoggedIn = await verifyToken(userSession);

  // Protected pages: require login
  const protectedPaths = ['/profile', '/cart', '/wishlist'];
  if (protectedPaths.some((p) => pathname.startsWith(p)) && !isUserLoggedIn) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Auth pages: redirect to profile if already logged in
  const authPaths = ['/login', '/register'];
  if (authPaths.includes(pathname) && isUserLoggedIn) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/profile', '/cart', '/wishlist', '/login', '/register'],
};
