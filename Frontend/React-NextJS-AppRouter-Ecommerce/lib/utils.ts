import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge";
import qs from "query-string"

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

export function round2(value: number | string) {
  if (typeof value === 'number') {
    const val = Math.round((value + Number.EPSILON) * 100) / 100;
    return val;

  } else if (typeof value === 'string') {
    const val = Math.round((Number(value) + Number.EPSILON) * 100) / 100;
    return val;

  } else {
    throw new Error('Value is not a number or string')
  }
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2
});

export function formatCurrency(amount: number | string | null) {
  if (typeof amount === 'number') {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return 'NaN';
  }
}

export function formatId(id: string) {
  return `...${id.substring(id.length - 6)}`;
}

export function formatDateTime (dateString: Date) {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    month: 'short',    // abbreviated month name (e.g., 'Oct')
    year: 'numeric',   // abbreviated month name (e.g., 'Oct')
    day: 'numeric',    // numeric day of the month (e.g., '25')
    hour: 'numeric',   // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true,      // use 12-hour clock (true) or 24-hour clock (false)
  };
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    month: 'short',   // abbreviated month name (e.g., 'Oct')
    year: 'numeric',  // numeric year (e.g., '2023')
    day: 'numeric',   // numeric day of the month (e.g., '25')
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',   // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true,      // use 12-hour clock (true) or 24-hour clock (false)
  };
  
  const formattedDateTime: string = new Date(dateString).toLocaleString('en-US', dateTimeOptions);
  const formattedDate: string = new Date(dateString).toLocaleString('en-US', dateOptions);
  const formattedTime: string = new Date(dateString).toLocaleString('en-US', timeOptions);
  
  return { dateTime: formattedDateTime, dateOnly: formattedDate, timeOnly: formattedTime };
};

export function formUrlQuery({ params, key, value }: {params: string; key:string; value: string | null}){
  const query = qs.parse(params); //{page: '2'}
  query[key] = value;

  return qs.stringifyUrl(
    { url: window.location.pathname, query },
    { skipNull: true }
  )
}

// (1)
// We use this because it returns the newly created object and:
// - Creates a deep copy: This method clones the object or array without keeping references to the original.
// - Removes functions and undefined values: Since JSON only supports certain data types(string, number, boolean, null, array, and object), any functions, undefined, or symbols inside value will be removed.
// - Useful for immutability: Helps avoid modifying the original object in cases where you need a fresh copy.