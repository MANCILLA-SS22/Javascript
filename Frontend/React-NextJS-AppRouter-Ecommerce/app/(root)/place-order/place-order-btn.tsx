import { useFormStatus } from 'react-dom';
import { Check, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function PlaceOrderButton() {
    const { pending } = useFormStatus();
    
    return (
        <Button disabled={pending} className='w-full'>
            {pending ? <Loader className='w-4 h-4 animate-spin' /> : <Check className='w-4 h-4' />}{' '}Place Order
        </Button>
    );
};