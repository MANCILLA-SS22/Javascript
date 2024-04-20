import { Router } from 'express';
import { PaymentService } from '../database/dao/mongo/services/payments.service.js'; 

const router = Router();

const products = [
    { id: 1, name: "papas", price: 1000 },
    { id: 2, name: "queso", price: 500 },
    { id: 3, name: "hamburguesa", price: 1500 },
    { id: 4, name: "soda", price: 1000 }, 
    { id: 5, name: "golosinas", price: 800 }
];

router.post('/payment-intents', async function(req, res){
    console.log(`Intentando realizar un pago con product id: ${req.query.id}`);
    try {
        const productRequested = products.find(product => product.id === parseInt(req.query.id))
        if (!productRequested) return res.status(404).send({ status: "error", error: "Product not found." });

        const paymentIntentInfo = { // Creamos un obj de pago
            amount: productRequested.price,
            currency: 'usd',
            metadata: {
                userId: "test user",
                product: JSON.stringify(productRequested)
            }
        }

        const service = new PaymentService(); // instanciamos el service para el pago
        let result = await service.createPaymentIntent(paymentIntentInfo);

        console.log("Resultado del intento de pago: ", result);
        res.send({ status: "success", payload: result });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "error", error: "Ocurrio un erro con el proveedor externo." });
    }
});


export default router