'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInWithCredentials } from '@/lib/actions/user.actions';
import { signInDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

function CredentialsSignInForm() {
    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: ""
    });

    function SignInButton() {
        const { pending } = useFormStatus();

        return (
            <Button disabled={pending} className='w-full' variant='default' >
                {pending ? 'Signing In...' : "Sign In"}
            </Button>
        )
    }

    return (
        <form action={action}>
            <div className="space-y-6">
                <div>
                    <Label>Email</Label>
                    <Input id='email' name='email' type='email' required autoComplete='email' defaultValue={signInDefaultValues.email} />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input id='password' name='password' type='password' required autoComplete='password' defaultValue={signInDefaultValues.password} />
                </div>
                <div>
                    <Button className='w-full' variant='default'>Sign In</Button>
                </div>

                <div>
                    <SignInButton />
                </div>

                {data && !data.success && <div className='text-center text-destructive'>{data.message}</div>}

                <div className='text-sm text-center text-muted-foreground'>
                    Don&apos;t have an account?{' '}
                    <Link href='/sign-up' target='_self' className='link'> {/* (1) */}
                        Sign Up
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default CredentialsSignInForm;

//(1)
// target = "_self" ensures that the link opens in the same tab(which is already the default behavior for <Link> in Next.js). Explicitly setting target="_self" ensures that the page stays in the same tab.
