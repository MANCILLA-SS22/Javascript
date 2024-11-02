type fibFunc = (n: number) => number;

export const fib: fibFunc = function (n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
};

export const myNum: number = 37;