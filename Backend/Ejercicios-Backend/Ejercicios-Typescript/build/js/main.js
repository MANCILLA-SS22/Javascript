"use strict";
// Primitives: number, string, boolean
// More complex types: arrays, objects
// Function types, parameters
// Primitives
let age;
age = 12;
let userName;
userName = 'Max';
let isInstructor;
isInstructor = true;
// More complex types
let hobbies;
hobbies = ['Sports', 'Cooking'];
let person;
person = {
    name: 'Max',
    age: 32,
};
// person = {
//   isEmployee: true
// };
let people;
// Type inference
let course = 'React - The Complete Guide';
course = 12341;
// Functions & types
function add(a, b) {
    return a + b;
}
function print(value) {
    console.log(value);
}
// Generics
function insertAtBeginning(array, value) {
    const newArray = [value, ...array];
    return newArray;
}
const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demoArray, -1); // [-1, 1, 2, 3]
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'd');
// updatedArray[0].split('');
