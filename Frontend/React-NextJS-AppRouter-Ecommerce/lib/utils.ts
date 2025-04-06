import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)); //(1)
};

export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
};

export function formatError(error: any): string {
  if (error.name === 'ZodError') { // Handle Zod Error
    const fieldErrors = Object.keys(error.errors);
    const mappingFieldErrors = fieldErrors.map((field) => error.errors[field].message);
    return mappingFieldErrors.join('. ');
    
  } else if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') { // Handle Prisma Error
    const field = error.meta?.target ? error.meta?.target[0] : 'Field';
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  
  } else { // Handle other errors
    return typeof error.message === 'string' ? error.message : JSON.stringify(error.message); 
  }
}

// We use this because it returns the newly created object and:
// - Creates a deep copy: This method clones the object or array without keeping references to the original.
// - Removes functions and undefined values: Since JSON only supports certain data types(string, number, boolean, null, array, and object), any functions, undefined, or symbols inside value will be removed.
// - Useful for immutability: Helps avoid modifying the original object in cases where you need a fresh copy.