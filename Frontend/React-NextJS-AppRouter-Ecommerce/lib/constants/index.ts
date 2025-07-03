export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Prostore';
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "A modern ecommerce platform built with Next.js";
export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
export const LATEST_PRODUCTS_LIMIT = Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;
export const DATABASE_URL = "postgres://neondb_owner:npg_7tZvGL8gHnJF@ep-empty-leaf-a57bz69i-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
export const signInDefaultValues = { email: '', password: '' }
export const signUpDefaultValues = { name: '', email: '', password: '', confirmPassword: '' }
export const shippingAddressDefaultValues = { fullName: 'German mancilla', streetAddress: '123 main st', city: 'Tijuana', postalCode: '12345', country: "Mexico" }; // export const shippingAddressDefaultValues = { fullName: '', streetAddress: '', city: '', postalCode: '', country: "" };
export const PAYMENT_METHODS = process.env.PAYMENT_METHODS ? process.env.PAYMENT_METHODS.split(", ") : ['PayPal', 'Stripe', 'CashOnDelivery'];
export const DEFAULT_PAYMENT_METHOD = process.env.DEFAULT_PAYMENT_METHOD || 'PayPal';
export const BASE_PAYPAL = process.env.BASE_PAYPAL || "https://api-m.sandbox.paypal.com";