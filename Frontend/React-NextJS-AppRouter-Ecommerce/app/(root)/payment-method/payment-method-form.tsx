'use client'

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";

import { updateUserPaymentMethod } from "@/lib/actions/user.actions";
import { paymentMethodSchema } from "@/lib/constants/validators";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";

function PaymentMethodForm({ preferredPaymentMethod }: { preferredPaymentMethod: string | null }) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof paymentMethodSchema>>({
        resolver: zodResolver(paymentMethodSchema),
        defaultValues: { type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD }
    });

    function onSubmit(values: z.infer<typeof  paymentMethodSchema>): void {
        startTransition(async function(){
            const res = await updateUserPaymentMethod(values);
            console.log("res", res);
            if (!res.success) {
                toast({ variant: 'destructive', description: res.message, });
                return;
            }

            router.push('/place-order');
        });
    }

    return (
        <>
            <div className='max-w-md mx-auto space-y-4'>
                <h1 className="h2-bold mt-4">Pymenth Method</h1>
                <p className="text-sm text-mute-foreground">Please select the payment method</p>
                <Form {...form}> {/* (1) */}
                    <form method="post" className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='flex flex-col md:flex-row gap-5'>
                            <FormField control={form.control} name='type' render={({ field }) => //(1)
                                <FormItem className="space-y-3">
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} className="flex flex-col space-y-2">
                                            {
                                                PAYMENT_METHODS.map(function(paymenthMethod){
                                                    return (
                                                        <FormItem key={paymenthMethod} className='flex items-center space-x-3 space-y-0'>
                                                            <FormControl>
                                                                <RadioGroupItem value={paymenthMethod} checked={field.value === paymenthMethod} />
                                                            </FormControl>
                                                            <FormLabel className='font-normal'>
                                                                {paymenthMethod}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            } />
                        </div>
                        <div className="flex gap-2">
                            <Button type='submit' disabled={isPending}>
                                {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <ArrowRight className='w-4 h-4' />}{" "} Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
}

export default PaymentMethodForm;

// (1)
// We use {...form } in <Form {...form}> in ShadCN UI (combined with React Hook Form) to pass all properties and methods from the form object to the custom <Form />
// It spreads all the keys and values from the form object — returned from useForm() — into the Form component as props. The form object contains things like:
// control, register, handleSubmit, formState, getValues, setValue, etc. When you write:
//                   <Form {...form}>
// It becomes:
//                   <Form control={form.control} register={form.register} handleSubmit={form.handleSubmit} formState={form.formState} />
// This gives the custom Form component access to everything it needs to provide context to all nested FormFields.