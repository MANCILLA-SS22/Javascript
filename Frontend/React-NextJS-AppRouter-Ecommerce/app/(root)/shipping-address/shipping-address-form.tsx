'use client';

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowRight, Loader } from "lucide-react";
import { z } from "zod"

import { ShippingAddress } from "@/types";
import { shippingAddressSchema } from "@/lib/constants/validators";
import { shippingAddressDefaultValues } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserAddress } from "@/lib/actions/user.actions";

function ShippingAddressForm({ address }: { address: ShippingAddress }) {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof shippingAddressSchema>>({
        resolver: zodResolver(shippingAddressSchema), //The resolver is used to integrate a schema validation library like Zod, Yup, Joi, etc., with React Hook Form.
        defaultValues: address || shippingAddressDefaultValues
    });

    function onSubmit(values: z.infer<typeof shippingAddressSchema>): void {
        startTransition(async () => {
            const res = await updateUserAddress(values);
            if (!res.success) {
                toast({ variant: 'destructive', description: res.message, });
                return;
            }

            router.push('/payment-method');
        });
    }

    return (
        <>
            <div className="nax-w-md mx-auto space-y-4">
                <h1 className="h2-bold mt-4">Shipping Address</h1>
                <p className="text-sm text-mute-foreground">Please enter an address to ship to</p>
                <Form {...form}>
                    <form method="post" className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col md:flex-row-gap-5">
                            <FormField control={form.control} name="fullName" render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'fullName'> }) => //(1)
                                <FormItem className="w-full">
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            } />
                        </div>
                    </form>
                </Form>
            </div>

            <div className="nax-w-md mx-auto space-y-4">
                <h1 className="h2-bold mt-4">Shipping Address</h1>
                <p className="text-sm text-mute-foreground">Please enter an address to ship to</p>
                <Form {...form}>
                    <form method="post" className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col md:flex-row-gap-5">
                            <FormField control={form.control} name="streetAddress" render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'streetAddress'> }) =>
                                <FormItem className="w-full">
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            } />
                        </div>
                    </form>
                </Form>
            </div>

            <div className="nax-w-md mx-auto space-y-4">
                <h1 className="h2-bold mt-4">Shipping Address</h1>
                <p className="text-sm text-mute-foreground">Please enter an address to ship to</p>
                <Form {...form}>
                    <form method="post" className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col md:flex-row-gap-5">
                            <FormField control={form.control} name="city" render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'city'> }) =>
                                <FormItem className="w-full">
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter city" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            } />
                        </div>
                    </form>
                </Form>
            </div>

            <div className="nax-w-md mx-auto space-y-4">
                <h1 className="h2-bold mt-4">Shipping Address</h1>
                <p className="text-sm text-mute-foreground">Please enter an address to ship to</p>
                <Form {...form}>
                    <form method="post" className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col md:flex-row-gap-5">
                            <FormField control={form.control} name="postalCode" render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'postalCode'> }) =>
                                <FormItem className="w-full">
                                    <FormLabel>Postal code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter postal code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            } />
                        </div>
                    </form>
                </Form>
            </div>

            <div className="nax-w-md mx-auto space-y-4">
                <h1 className="h2-bold mt-4">Shipping Address</h1>
                <p className="text-sm text-mute-foreground">Please enter an address to ship to</p>
                <Form {...form}>
                    <form method="post" className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex flex-col md:flex-row-gap-5">
                            <FormField control={form.control} name="country" render={({ field }: { field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'country'> }) =>
                                <FormItem className="w-full">
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter country" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            } />
                        </div>
                    </form>
                </Form>
            </div>

            <div className="flex gap-3">
                <Button type='submit' disabled={isPending}>
                    {isPending ? <Loader className='w-4 h-4 animate-spin' /> : <ArrowRight className='w-4 h-4' />}{" "} Continue
                </Button>
            </div>
        </>
    );
}

export default ShippingAddressForm;

//(1)
// field: ControllerRenderProps<z.infer<typeof shippingAddressSchema>, 'fullName'>
// The top line of code says: “This field object controls the 'fullName' field of a form whose type is based on the shippingAddressSchema.”

// ControllerRenderProps <TFieldValues, TName>
// This is a type provided by react-hook-form that describes what props are available on the field object used to control an input. These include:
//   - value: the current value of the field
//   - onChange: the function to call when the value changes
//   - onBlur: when the input loses focus
//   - name: the field name(like 'fullName')
// When you use controlled components (like custom inputs or UI library inputs), react-hook-form wraps them using the <Controller> component. 
// The render prop of Controller gives you access to an object called field, and ControllerRenderProps is the type of that field object.

// z.infer<typeof shippingAddressSchema>
// This uses Zod’s infer helper to get the TypeScript type of your schema.
// For example, if your Zod schema is:                         const shippingAddressSchema = z.object({ fullName: z.string(), address: z.string() });
// Then z.infer < typeof shippingAddressSchema > becomes:      { fullName: string; address: string }