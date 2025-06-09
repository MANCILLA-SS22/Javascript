import { Session } from "next-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import SignUpForm from "./sign-up-form";

export const metadata: Metadata = {
    title: 'Sign Up'
}

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | undefined }>

// async function SignUpPage({ params, searchParams }: { params: Params, searchParams: SearchParams }) {
async function SignUpPage(props: { params: Params, searchParams: SearchParams }) {
    const { callbackUrl } = await props.searchParams; // const callbackUrl = (await props.searchParams).callbackUrl;
    const session: Session | null = await auth();
    if (session) return redirect(callbackUrl || "/");

    return (
        <div className='w-full max-w-md mx-auto'>
            <Card>
                <CardHeader className='space-y-4'>
                    <Link href='/' className='flex-center'>
                        <Image src='/images/logo.svg' width={100} height={100} alt={`${APP_NAME} logo`} priority={true} />
                    </Link>
                    <CardTitle className='text-center'>Create account</CardTitle>
                    <CardDescription className='text-center'>Enter your information below to sign up</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <SignUpForm/>
                </CardContent>
            </Card>
        </div>
    );
}

export default SignUpPage;