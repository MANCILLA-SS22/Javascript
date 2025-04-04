import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import CredentialsProvider from "next-auth/providers/credentials"
import { compareSync } from 'bcrypt-ts-edge';
import type {NextAuthConfig} from 'next-auth'

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

                console.log("user", user);

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
            session.user.id = token.sub; // Set the user ID from the token
            if (trigger === 'update') session.user.name = user.name; // If there is an update, set the user name
            return session;
        },
    }
} satisfies NextAuthConfig);