import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import CredentialsProvider from "next-auth/providers/credentials"
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig, Session } from 'next-auth';
import { authConfig } from './auth.config';

const obj = {
    secret: process.env.NEXT_SECRET,
    pages: {
        signIn: '/sign-in',
        error: '/sign-in'
    },
    session: {
        strategy: "jwt" as const, //(1)
        maxAge: 30 * 24 * 60 * 60,
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                if (!credentials) return null;
                const user = await prisma.user.findFirst({
                    where: { email: credentials!.email as string }
                });

                if (user && user.password) {
                    const isMatch: Boolean = compareSync(credentials.password as string, user.password);
                    if (isMatch) return { id: user.id, name: user.name, email: user.email, role: user.role }
                }

                return null;
            }
        })
    ],
    callbacks: {
        async session({ session, user, trigger, token }: any) {
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;
            if (trigger === 'update') session.user.name = user.name;
            return session;
        },

        async jwt({ token, user, trigger, session }: any) {
            if (user) {
                token.role = user.role;
                if (user.name === "NO_NAME") {
                    console.log("verify");
                    token.name = user.email!.split("@")[0];
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { name: token.name }
                    });
                }
            };
            return token;
        },

        ...authConfig.callbacks || {}
    },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(obj);
    
//(1)
// This is because this value has to be one of 3 values("jwt" | "database" | undefined) and we want to make sure it's always "jwt" and not a string that could be anything. Here,
// strategy is no longer inferred as string; it is inferred as the literal type "jwt". If you don't add this, you will get an error for the config we pass into NextAuth at the end of the file.