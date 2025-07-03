import { generateAccessToken, paypal } from "@/lib/paypal";

test("generates token from paypal", async function(){
    const tokenResponse = await generateAccessToken();
    console.log(tokenResponse);;
    expect(typeof tokenResponse).toBe('string');
    expect(tokenResponse.length).toBeGreaterThan(0);
});

// Test to create a paypal order
test('creates a paypal order', async function(){
    const token = await generateAccessToken();
    const price = 10.0;

    const orderResponse = await paypal.createOrder(price);
    console.log(orderResponse);

    expect(orderResponse).toHaveProperty('id');
    expect(orderResponse).toHaveProperty('status');
    expect(orderResponse.status).toBe('CREATED');
});

// Test to capture payment with mock order
test('simulate capturing a payment from an order', async function(){
    const orderId = '100';

    const mockCapturePayment = jest
        .spyOn(paypal, 'capturePayment')
        .mockResolvedValue({
            status: 'COMPLETED',
        });

    const captureResponse = await paypal.capturePayment(orderId);
    expect(captureResponse).toHaveProperty('status', 'COMPLETED');

    mockCapturePayment.mockRestore();
});