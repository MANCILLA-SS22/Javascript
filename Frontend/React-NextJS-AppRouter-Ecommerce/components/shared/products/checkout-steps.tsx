import { cn } from "@/lib/utils";
import { Fragment, ReactNode } from "react";

function CheckoutSteps({ current = 0 }) {

    function render1(): ReactNode {
        const arr = ['User Login', 'Shipping Address', 'Payment Method', 'Place order'];
        const render = arr.map(function (step, index) {
            return (
                <>
                    <Fragment key={step}>
                        <div className={cn('p-2 w-56 rounded-full text-center text-sm', index === current ? 'bg-secondary' : '')}>
                            {step}
                        </div>
                        {step !== 'Place Order' && <hr className='w-16 border-t border-gray-300 mx-2' />}
                    </Fragment>
                </>
            );
        });
        return render;
    }

    return (
        <div className="flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10">
            {render1()}
        </div>
    );
}

export default CheckoutSteps;


//user login
//shipping address
//payment method
//place order page