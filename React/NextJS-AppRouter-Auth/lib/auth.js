import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import db from "./db";

const adapter = new BetterSqlite3Adapter(db, { user: 'users', session: 'sessions' });
const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === 'priduction'
        }
    }
});

function setCookies(sessionCookie){
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}

export async function createAuthSession(userId) {
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    setCookies(sessionCookie);
}

export async function verifyAuth() {
    const sessionCookie = cookies().get(lucia.sessionCookieName);
    const sessionId = sessionCookie.value;
    if (!sessionCookie || !sessionId) return { user: null, session: null };
    const result = await lucia.validateSession(sessionId);
    try {
        if (result.session && result.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            setCookies(sessionCookie);
        }
        if (!result.session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            setCookies(sessionCookie);
        }
    } catch {}

    return result;
};

export async function destroySession() {
    const { session } = await verifyAuth();
    if (!session) return {error: 'Unauthorized!'};
    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}
