import type { NextAuthConfig, Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export const authConfig = {
    providers: [], // Required by NextAuthConfig type
    secret: process.env.NEXT_SECRET,
    callbacks: {
        authorized({ request, auth }: { request: NextRequest; auth: Session | null; }) { //(1)
            const protectedPaths: RegExp[] = [/\/shipping-address/, /\/payment-method/, /\/place-order/, /\/profile/, /\/user\/(.*)/, /\/order\/(.*)/, /\/admin/]; //(2)
            const { pathname }: { pathname: string } = request.nextUrl; // Get pathname from the req URL object
            const getProtectedPath: boolean = protectedPaths.some((path) => path.test(pathname)); //Verify if we get the same path            
            if (!auth && getProtectedPath) return false;// Check if user is not authenticated and accessing a protected path
            
            if (!request.cookies.get('sessionCartId')) {// Check for session cart cookie
                const sessionCartId = crypto.randomUUID();// Generate new session cart id cookie
                const response = NextResponse.next({// Create new response and add the new headers
                    request: {
                        headers: new Headers(request.headers),
                    },
                });
                response.cookies.set('sessionCartId', sessionCartId); // Set newly generated sessionCartId in the response cookies
                return response;
            }

            return true;
        },
    },
} satisfies NextAuthConfig;

//(1)
// The authorized() function is commonly used inside the callback property of the auth configuration, particularly in the middleware (middleware.ts or middleware.js).
// The purpose of this function is to control access to specific routes based on authentication status or authorization logic. It allow you to:
//   - Restrict access to authenticated users only.
//   - Implement role - based access control(RBAC) by checking user roles or permissions.
//   - Customize authentication behavior for different pages or API routes.

// Why is authorized() needed in this code ?
//  1. Session - based Authorization
//      - It ensures that users can access protected routes only if they meet certain criteria.
//      - In this implementation, it's used to check if a sessionCartId cookie exists in the request.
//  2. Cookie Management for Anonymous Users
//      - If the request does not contain a sessionCartId cookie, the function generates a new UUID and assigns it as a cookie.
//      - This helps maintain session state for users who are not yet authenticated, possibly for tracking carts, guest sessions, or analytics.
//  3. Handling Requests Properly
//      - If the sessionCartId cookie is missing, the function creates a NextResponse object with a new cookie and returns it.
//      - If the cookie already exists, it simply returns true, allowing the request to proceed.

//When is authorized() used?
//  - It is uted before serving a request to verify whether a user should have access.
//  - It can be useful for handling authentication, role - based access control(RBAC), or session management.
//  - In this case, it ensures that every user, whether authenticated or not, has a sessionCartId.

//(2)
// RegExp.prototype.test()
// The test() method of RegExp instances executes a search with this regular expression for a match between a regular expression and a specified string. Returns true if there is a match; false otherwise.