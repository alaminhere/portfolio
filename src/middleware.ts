import { NextResponse } from 'next/server';
import withAuth from 'next-auth/middleware';
const authPages = ['login-admin', '/verification'];

export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;

    if (!token && pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (token && authPages.some(page => pathname.startsWith(page))) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/',
    },
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (authPages.some(page => pathname.startsWith(page))) {
          return true;
        }

        if (pathname.startsWith('/admin')) {
          return !!token;
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: ['/admin/:path*', '/login-admin', '/verification'],
};
