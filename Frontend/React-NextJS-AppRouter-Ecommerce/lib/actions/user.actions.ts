'use server';

import { signInFormSchema, signUpFormSchema } from "../constants/validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma"
import { formatError } from "../utils";

export async function signInWithCredentials(prevState: unknown, formData: FormData) {
    try {
        const user = signInFormSchema.parse({ email: formData.get("email"), password: formData.get("password") }); //(1)
        await signIn('credentials', user); //(2)
        return { success: true, message: 'Signed in successfully' }
    } catch (error) {
        if (isRedirectError(error)) throw error;
        return { success: false, message: 'Invalid email or password' }
    }
}

export async function signOutUser() {
    await signOut();
};

export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const user = signUpFormSchema.parse({
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            confirmPassword: formData.get("confirmPassword"),
        });

        const plainPassword = user.password
        user.password = hashSync(user.password, 10);

        await prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });

        await signIn("credentials", {
            email: user.email,
            password: plainPassword
        });

        return { 
            success: true, 
            message: 'User register successfuly' 
        }

    } catch (error) {
        if (isRedirectError(error)) throw error;
        return { success: false, message: formatError(error) }
    }
}

//(1)
// Given any Zod schema, you can call its .parse method to check data is valid. If it is, a value is returned with full type information! Otherwise, an error is thrown.
// The value returned by .parse is a deep clone of the variable you passed in.

//(2)
// In NextAuth.js, the signIn function allows you to authenticate users using different providers (e.g., Google, GitHub, Credentials, etc.). The first argument of signIn(provider, options) is the provider's
// name as defined in your NextAuth configuration. Since you are using Credentials Provider in your NextAuth setup, you need to pass 'credentials' as the first argument. This tells NextAuth:
//  - Which provider to use → The 'credentials' provider
//  - What data to send → The user object containing { email, password }