import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth: middleware } = NextAuth(authConfig)

//This is necessary for integrating NextAuth authentication with Next.js middleware. Here’s why:
// 1. Protecting Routes with Middleware
// Next.js middleware allows you to intercept requests before they reach your API routes or pages.By exporting auth as middleware, you're enabling NextAuth to:
//   - Automatically check authentication status before serving protected content.
//   - Redirect unauthorized users(e.g., to the / sign -in page).
//   - Apply authentication logic at the edge, before the request even reaches a page or API route.

//2. What Happens Under the Hood?
//   - In auth.ts(or wherever NextAuth is configured), auth is an object containing authentication - related handlers.
//   - By exporting it as middleware, Next.js automatically applies it to requests globally(or conditionally if you specify a matcher in middleware.ts).
//   - This ensures that any route using this middleware will have authentication logic enforced without needing to manually wrap each page.

//3. Example: How Middleware Works
// If your middleware.ts looks like this:
// export { auth as middleware } from '@/auth';
// export const config = {
//     matcher: ['/dashboard/:path*', '/profile/:path*'], // Apply middleware only to these paths
// };
//   - When a user accesses /dashboard or /profile, the middleware automatically runs authentication checks.
//   - If the user is not authenticated, they might be redirected to / sign -in (depending on your NextAuth settings).
//   - If authenticated, the request proceeds normally.

//4. Why Can't We Just Rely on authorized()?
//   - The authorized() callback inside NextAuth only applies inside NextAuth routes, like GET / api / auth / session.
//   - Middleware ensures all routes(such as pages, APIs, and static assets) are checked before they load.
