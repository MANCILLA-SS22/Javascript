// import { showAlert } from './alert';
async function bookTour (tourId){
    try {
        // 1) Get checkout session from API (We must use the public stripe key in our frontend)
        const stripe = Stripe('pk_test_51Oq3fdADN26fJ7lb7AKicRYeJCKBkbJMmftomcoYzF0z030ZMQUdXTmcpuVPinAqzrcGVaqYYlNAyfQEp4ioGxFh00X4yPH6l7');
        const session = await axios(`http://localhost:5500/api/v1/bookings/checkout-session/${tourId}`); //  --> /api/v1/bookings/checkout-session/${tourId} <-- Usar esto cuando la app esta en produccion
        console.log(session);

        // 2) Create checkout form + chanre credit card
        await stripe.redirectToCheckout({ sessionId: session.data.session.id });
    } catch (err) {
        console.log(err);
        alert('error', err);
    }
};

export {bookTour}