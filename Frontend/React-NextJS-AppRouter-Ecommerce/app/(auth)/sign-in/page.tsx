import { Session } from "next-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/auth";

export const metadata: Metadata = {
    title: 'Sign In'
}

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | undefined }>;

// async function SignInPage(props: { praams: Params, searchParams: SearchParams }) {
async function SignInPage({ params, searchParams }: { params: Params, searchParams: SearchParams }) {
    const { callbackUrl } = await searchParams; // const callbackUrl = (await props.searchParams).callbackUrl;
    const session: Session | null = await auth();
    if (session) return redirect(callbackUrl || "/");

    return (
        <div className='w-full max-w-md mx-auto'>
            <Card>
                <CardHeader className='space-y-4'>
                    <Link href='/' className='flex-center'>
                        <Image src='/images/logo.svg' width={100} height={100} alt={`${APP_NAME} logo`} priority={true} />
                    </Link>
                    <CardTitle className='text-center'>Sign In</CardTitle>
                    <CardDescription className='text-center'>Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <CredentialsSignInForm />
                </CardContent>
            </Card>
        </div>
    );
}

export default SignInPage;