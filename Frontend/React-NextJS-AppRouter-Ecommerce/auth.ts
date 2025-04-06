import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import CredentialsProvider from "next-auth/providers/credentials"
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth'

export const { handlers, auth, signIn, signOut } = NextAuth({
    secret: process.env.NEXT_SECRET,
    pages: {
        signIn: '/sign-in',
        error: '/sign-in'
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
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
                    const isMatch = compareSync(credentials.password as string, user.password);
                    if (isMatch) return { id: user.id, name: user.name, email: user.email, role: user.role }
                }

                return null;
            }
        })
    ],
    callbacks: {
        async session({ session, user, trigger, token }: any) {
            // console.log("token", token);
            // console.log("session", session);
            session.user.id = token.sub; // Set the user ID from the token
            session.user.role = token.role;
            session.user.name = token.name;
            if (trigger === 'update') session.user.name = user.name; // If there is an update, set the user name
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
        }

    }
} satisfies NextAuthConfig);