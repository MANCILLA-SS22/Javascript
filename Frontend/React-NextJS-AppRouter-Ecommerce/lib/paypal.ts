import { Buffer } from "node:buffer";
import { BASE_PAYPAL } from "./constants";

export const paypal = {
    createOrder: async function createOrder(price: number) {
        const accessToken = await generateAccessToken();
        const url = `${BASE_PAYPAL}/v2/checkout/orders`;
        const response: Response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: price
                        }
                    }
                ]
            })
        });

        return handleResponse(response);
    },

    capturePayment: async function capturePayment(orderId: string) {
        const accessToken = await generateAccessToken();
        const url = `${BASE_PAYPAL}/v2/checkout/orders/${orderId}/capture`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            },
        });
        return handleResponse(response);
    }
};

export async function generateAccessToken() {
    const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
    const auth: string = Buffer.from(`${PAYPAL_CLIENT_ID}: ${PAYPAL_APP_SECRET}`).toString("base64"); //(1)
    const url: string = `${BASE_PAYPAL}/v1/oauth2/token`;

    const response: Response = await fetch(url, {
        method: "POST",
        body: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    const jsonData = await handleResponse(response);
    return jsonData.access_token;
};

async function handleResponse(response: Response) {
    if (response.ok) {
        return response.json();
    } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
}

//(1)
// This is used to generate a Basic Authentication token in the Base64 encoding format, which is the required format when authenticating with the PayPal REST API.

// 1. PayPal expects HTTP Basic Auth format: According to PayPal’s API docs, to obtain an access token, you must send a POST request with an Authorization header like this:
//    Authorization: Basic <base64-encoded-string>
//    Where <base64-encoded-string> is:
//    Base64("CLIENT_ID:CLIENT_SECRET")

// Buffer.from(...) → Converts that string into a binary buffer.
// .toString("base64") → Encodes the binary buffer into a Base64 string.
// Example -->  Buffer.from("abc:123").toString("base64"); // => "YWJjOjEyMw=="
// Use Buffer.from(...).toString("base64") to generate a Base64-encoded Basic Auth token, which is required by PayPal’s OAuth 2.0 endpoint to authenticate your app and obtain an access token.