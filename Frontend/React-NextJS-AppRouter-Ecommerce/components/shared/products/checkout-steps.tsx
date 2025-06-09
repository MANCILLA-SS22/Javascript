import { cn } from "@/lib/utils";
import { Fragment } from "react";

function CheckoutSteps({ current = 0 }) {
    const arr = ['User Login', 'Shipping Address', 'Payment Method', 'Place order'];
    
    return (
        <div className="flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10">
            {
                arr.map(function (step, index) {
                    return (
                        <>
                            <Fragment key={step}>
                                <div className={cn('p-2 w-56 rounded-full text-center text-sm', index === current ? 'bg-secondary' : '')}>
                                    {step}
                                </div>
                                {step !== 'Place Order' && (<hr className='w-16 border-t border-gray-300 mx-2' />)}
                            </Fragment>
                        </>
                    )
                })
            }
        </div>
    );
}

export default CheckoutSteps;


//user login
//shipping address
//payment method
//place order page