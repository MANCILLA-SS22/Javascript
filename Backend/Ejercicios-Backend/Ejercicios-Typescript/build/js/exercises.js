"use strict";
// let username = 'German';
// console.log(username);
// let a: number = 12;
// let b: string = '6';
// let c: number = 2;
// // console.log(a/b);
// console.log(a*c);
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Primitives %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// let myName: string = 'German';
// let meaningOfLife: number;
// let isLoading: boolean;
// let album : any;
// let disk: string | number; //union type
// let re: RegExp = /\w+/g;
// myName = 'Mancilla';
// meaningOfLife = 42;
// isLoading = true;
// album = 1984;
// disk = 1;
// disk = 'new';
// function sum(a:number, b:number){
//     return a + b;
// }
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Arrays & Objects %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// let stringArr = ['one', 'two', 'three'];
// let guitars = ['strat', 'Les Paul', 5150];
// let mixedData = ['EVH', 1984, true];
// stringArr[0] = 'John'
// stringArr.unshift('hey')
// guitars[0] = 1984;
// guitars.unshift('Jim');
// let test = [];
// let bands: string[] = [];
// bands.push('Van Halen');
// let myTuple: [string, number, boolean] = ['German', 26, true]; //Tuple
// let mixed = ['John', 1, false];
// // mixed = myTuple; //ok
// // myTuple = mixed //error
// let myObj: object;
// myObj = [];
// console.log(typeof myObj); // 'object'
// myObj = bands;
// myObj = {};
// const exampleObj = {
//     prop1: 'German',
//     prop2: true
// }
// exampleObj.prop1 = 'Mancilla';
// // type Guitarrist = {
// //     name: string,
// //     active?: boolean, //The property is either boolean or undefined. It became a union type
// //     albums: (string | number)[] // string or number can be in the array for "albums"
// // };
// interface Guitarrist {
//     name?: string,
//     active: boolean,
//     albums: (string | number)[]
// };
// let evh: Guitarrist = {
//     name: 'Eddie',
//     active: false,
//     albums: [1984, 5150, 'OU812']
// };
// let jp: Guitarrist = {
//     name: 'Jimmy',
//     active: true, //If we disable this property, everything is fine because we're using the "?". So this means we can either consider the "active" property or not.
//     albums: ['I', 'II', 'IV']
// };
// evh = jp;
// function greetGuitarist(guitarist: Guitarrist){
//     //Method 1 (Narrowing)
//     if (guitarist.name) return `Hello ${guitarist.name.toUpperCase}`;
//     return 'Hello';
//     //Method 2 (using "?")
//     // return `Hello ${guitarist.name?.toUpperCase}`; //We use "?" becasue the object we're passing in may be "undefined". So the "toUpperCase" doesn't admit an "undefined" value
// };
// console.log(greetGuitarist(jp));
// enum Grade { //Enums
//     U = 1,
//     D,
//     C,
//     B,
//     A
// };
// console.log(Grade);
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Functions %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//Type aliases
// type stringOrNumber = string | number;
// type stringOrNumberArray = (string | number)[];
// type Guitarrist = {
//     name?: string,
//     active: boolean,
//     albums: (string | number)[]
// };
// type UserId = stringOrNumber;
// // interface PostId = stringOrNumber; //This won't work because "interface" think about those more as object or clases, and "type" as an alias for any type of TS type that we might assign.
// //Literal types
// let myName: 'German';
// // myName = 'Mancilla'; //This won't work because "myName" is an string of "German" type, not string.
// let username: 'Dave' | 'John' | 'Amy';
// username = 'Amy';
// //functions
// function adding(a: number, b: number): number { //"number" afer parentheses means that we'll return a "number". We can ommit this pattern because TS will infer what we're trying to return.
//     return a + b;
// }
// function logMsg(message: any): void { // 'void' os fpr functions that don't return anything
//     console.log('message');
// }
// logMsg('Hello!');
// logMsg(add(2, 3));
// // logMsg(add('a', 3));
// function substract(c: number, d: number): number { //"number" afer parentheses means that we'll return a "number". We can ommit this pattern because TS will infer what we're trying to return.
//     return c - d;
// };
// ////TS does not support the use of function inside a type declaration in the way I initially described. You should continue using the arrow function syntax when declaring function types.
// // type mathFunction = function (a: number, b: number): number;
// // type mathFunction = (a: number, b: number) => number;   //Method 1: Using "type"
// interface mathFunction {                                   //Method 2: Using "interface"
//     (a: number, b: number): number ;
// }
// let multiply: mathFunction = function (c, d) {
//     return c * d;
// }
// //Optional parameters
// function addAll(a: number, b: number, c?:number): number{
//     if (typeof c !== 'undefined') a + b + c;
//     return a + b;
// };
// function sumAll(a: number = 10, b: number, c: number = 2): number {
//     return a + b + c;
// };
// console.log(addAll(2, 3, 3));
// console.log(addAll(2,3));
// console.log(sumAll(2,3));
// console.log(sumAll(undefined, 3));
// //Rest parameters
// function total(a: number, ...nums: number[]): number { //In TS, the type annotation on these parameters is implicitly any[] instead of any, and any type annotation given must be of the form Array<T> or T[], or a tuple type
//     return a + nums.reduce((prev, curr) => prev+curr)
// };
// logMsg(total(10,2,3));
// function infinite(){
//     let i: number = 1;
//     while(true){
//         i++;
//         if(i > 100) break;
//     }
// };
function isNumber(value) {
    return typeof value === 'number' ? true : false;
}
function createError(errMsg) {
    throw new Error(errMsg);
}
;
function numerOrString(value) {
    if (typeof value === 'string')
        return 'string';
    if (isNumber(value))
        return 'number';
    return createError("This should never happen!");
}
console.log(numerOrString(true));
