import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('admin_token')?.value;

  // Secret for JWT verification
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'supersecret'
  );

  // Helper to verify token
  const verifyToken = async (token: string | undefined) => {
    if (!token) return null;
    try {
      const { payload } = await jwtVerify(token, secret);
      return payload;
    } catch (err) {
      return null;
    }
  };

  const isVerified = await verifyToken(token);

  // 1. Protection: If trying to access /admin and NOT verified
  if (pathname.startsWith('/admin') && pathname !== '/admin/login' && !isVerified) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // 2. Redirection: If already verified and trying to access /admin/login
  if (pathname === '/admin/login' && isVerified) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

// Config to match only admin routes
export const config = {
  matcher: ['/admin/:path*'],
};
