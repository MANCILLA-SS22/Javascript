'use client'

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { signInWithCredentials } from '@/lib/actions/user.actions';
import { signInDefaultValues } from '@/lib/constants';
import { SignInButton } from './SignInButton';


function CredentialsSignInForm() {
    const [data, action] = useActionState(signInWithCredentials, { success: false, message: "" });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
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
                    <SignInButton/> {/* 2 */}
                </div>

                {data && !data.success && <div className='text-center text-destructive'>{data.message}</div>}

                <div className='text-sm text-center text-muted-foreground'>
                    Don&apos;t have an account?{' '}
                    <Link href='/sign-up' target='_self' className='link'>Sign Up</Link> {/* (1) */}
                </div>
            </div>
        </form>
    );
}

export default CredentialsSignInForm;

//(1)
// target = "_self" ensures that the link opens in the same tab(which is already the default behavior for <Link> in Next.js). Explicitly setting target="_self" ensures that the page stays in the same tab.

//(2)
// useFormStatus will not return status information for a < form > rendered in the same component.
// The useFormStatus Hook only returns status information for a parent < form > and not for any < form > rendered in the same component calling the Hook, or child components.