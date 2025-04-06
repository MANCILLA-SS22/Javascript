'use client'

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { signUpUser } from '@/lib/actions/user.actions';
import { signUpDefaultValues } from '@/lib/constants';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function SignUpForm() {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: ""
    });

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    function SignUpButton() {
        const { pending } = useFormStatus();

        return (
            <Button disabled={pending} className='w-full' variant='default' >
                {pending ? 'Submitting...' : "Sign Up"}
            </Button>
        );
    };

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">

                <div>
                    <Label>Name</Label>
                    <Input id='name' name='name' type='text' required autoComplete='name' defaultValue={signUpDefaultValues.name} />
                </div>
                <div>
                    <Label>Email</Label>
                    <Input id='email' name='email' type='email' required autoComplete='email' defaultValue={signUpDefaultValues.email} />
                </div>
                <div>
                    <Label>Password</Label>
                    <Input id='password' name='password' type='password' required autoComplete='password' defaultValue={signUpDefaultValues.password} />
                </div>
                <div>
                    <Label>Confirm Password</Label>
                    <Input id='confirmPassword' name='confirmPassword' type='password' required autoComplete='confirmPassword' defaultValue={signUpDefaultValues.confirmPassword} />
                </div>

                <div>
                    {SignUpButton()}
                </div>

                {data && !data.success && <div className='text-center text-destructive'>{data.message}</div>}

                <div className='text-sm text-center text-muted-foreground'>
                    Already have an account?{' '}
                    <Link href='/sign-in' target='_self' className='link'>Sign ip</Link> {/* (1) */}
                </div>
            </div>
        </form>
    );
}

export default SignUpForm;

//(1)
// target = "_self" ensures that the link opens in the same tab(which is already the default behavior for <Link> in Next.js). Explicitly setting target="_self" ensures that the page stays in the same tab.
