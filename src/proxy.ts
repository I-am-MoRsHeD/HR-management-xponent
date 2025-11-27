import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value || null;
    const pathname = request.nextUrl.pathname;

    const authPages = ['/login', '/register'];
    const protectedRoutes = [
        '/users',
        '/attendance',
        '/performance',
        '/payroll',
    ];

    if (accessToken && authPages.some(path => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/users', request.url));
    }

    if (!accessToken && protectedRoutes.some(path => pathname.startsWith(path))) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (accessToken) {
        try {
            jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET as string);
        } catch (err) {
            const response = NextResponse.redirect(new URL("/login", request.url));
            response.cookies.delete("accessToken");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
    ],
};
