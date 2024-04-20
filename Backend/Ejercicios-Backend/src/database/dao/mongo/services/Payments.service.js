import Stripe from 'stripe';
import { stripSecretKey } from '../../../../config/config.js';

class PaymentService {
    constructor() {
        this.stripe = new Stripe(stripSecretKey);
    }

    createPaymentIntent = async (data) => {
        const paymentIntent = this.stripe.paymentIntents.create(data);
        console.log("Stripe result: ", paymentIntent);
        return paymentIntent
    }
};

export {PaymentService};