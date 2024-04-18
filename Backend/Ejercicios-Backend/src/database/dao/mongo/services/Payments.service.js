import Stripe from 'stripe';
import config from '../config/config.js';

class PaymentService {
    constructor() {
        this.stripe = new Stripe(config.stripeSecretKey)
    }

    createPaymentIntent = async (data) => {
        const paymentIntent = this.stripe.paymentIntents.create(data)
        console.log("Stripe result: ", paymentIntent);
        return paymentIntent
    }
};

export {PaymentService};