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

// function isNumber(value: any): boolean{
//     return typeof value === 'number' ? true : false;
// }

// function createError(errMsg: string): never { //"never" is essentially for functions explicitly throw errors.
//     throw new Error(errMsg);
// };

// function numerOrString(value: number | string): string{
//     if (typeof value === 'string') return 'string';
//     if (isNumber(value)) return 'number';
//     return createError("This should never happen!");
// }

// console.log(numerOrString("Hey!"));
// console.log(numerOrString(1));
// // console.log(numerOrString(true));


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Type assertions %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// type One = string;
// type Two = string | number;
// type Three = 'hello';

// let a: One = 'hello';
// let b = a as Two //less specific
// let c = a as Three; //more specific

// let d = <One>'world';
// let e = <string | number>'world';

// function addOrConcat(a: number, b: number, c: 'add' | 'concat'): number | string{
//     if(c === 'add') return a + b;
//     return '' + a + b;
// }

// //Method 1
// // let myVal: number | string = addOrConcat(2, 2, 'concat');

// //Method 2: Here we're telling TS that we know this is going to return a string because we told it to. And now TS has no problem with "myVal" being a string because we have told TS explicitly through our assertion
// //that 'add' or 'concat' will return a string in this instance.
// let myVal: string = addOrConcat(2, 2, 'concat') as string;
// let nextVal: number = addOrConcat(2, 2, 'concat') as number; //Be careful! TS sees no problem - but a string is returned

// // 10 as string;
// // (10 as unknown) as string;

// const img = document.querySelector('img')!; //The "!" symbol means: non-unll assertion (This isn't null)
// const myImg = document.getElementById("#img") as HTMLImageElement; //Method 1
// const nextImg = <HTMLImageElement>document.getElementById("#img"); //Method 2

// img.src;
// myImg.src;
// nextImg.src;


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Type assertions exercise %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//Original JS code
// const year = document.getElementById("year");
// const thisYear = new Date().getFullYear();
// year.setAttribute("datatime", thisYear);
// year.textContent = thisYear;

// //Solution 1 using TS
// let year: HTMLElement | null;
// year = document.getElementById("year");
// let thisYear: string;
// thisYear = new Date().getFullYear().toString();
// if(year){
//     year.setAttribute("datatime", thisYear);
//     year.textContent = thisYear;
// }

//Solution 2 using TS
// const year: HTMLElement | null = document.getElementById("year") as HTMLSpanElement; // Option 1
// const year = document.getElementById("year") as HTMLSpanElement;                        // Option 2
// const thisYear: string = new Date().getFullYear().toString();
// year.setAttribute("datatime", thisYear);
// year.textContent = thisYear;


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Classes %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//Option 1
// class Coder {
//     name: string
//     music: string
//     age: number
//     lang: string

//     constructor(name: string, music: string, age: number, lang: string) {
//         this.name = name
//         this.music = music
//         this.age = age
//         this.lang = lang
//     }
// }

//Option 2 (using visibility modifiers)
//Diference between 'private' and 'protected': lang could be accessed inside of the class but it could also be accessed inside of derived classes if we were to extend it to a subclass we could still access 'lang'.
//But 'age' is private and can only be accessed inside of this class

// class Coder {
//     secondLang!: string //This means that we're asserting that we know what we're doing and we're just not going to initialize this right away

//     constructor(
//         public readonly name: string,
//         public music: string,
//         private age: number,
//         protected lang: string = 'Typescript'
//     ) {}

//     public getAge(){
//         return `Hello, I am ${this.age}`;
//     }
// };

// const German = new Coder('German', 'Rock', 26);
// console.log(German.getAge());
// // console.log(German.age);
// // console.log(German.lang);

// class webDev extends Coder{
//     constructor(public computer: string, name: string, music: string, age: number){
//         super(name, music, age); //super needs come before we try to assign anything else like: this.computer = computer;
//         this.computer = computer;
//     };

//     public getLang(){
//         return `I write ${this.lang}`;//We can access to 'lang' even if we didn't define it in our webDev class because we're extending all from Coder which has that property.
//     }
// }

// const Sara = new webDev('Mac', 'Sara', 'Lofi', 25);
// console.log(Sara.getLang());
// // console.log(Sara.age);
// // console.log(Sara.lang);



//Implementing an interface to a class
// interface Musician{
//     name: string,
//     instrument: string,
//     play(action: string): string
// }

// class Guitarist implements Musician{
//     name: string
//     instrument: string

//     constructor(name: string, instrument: string){
//         this.name = name;
//         this.instrument = instrument;
//     }

//     play(action: string): string {
//         return `${this.name} ${action} the ${this.instrument}`;
//     }
// };

// const Page = new Guitarist('Jimmy', 'guitar');
// console.log(Page.play('strums'));

// //Using classes with 'static'
// class Peeps{
//     static count: number = 0
//     static getCount(): number {
//         return Peeps.count
//     }

//     public id: number

//     constructor(public name: string){
//         this.name = name;
//         this.id = ++Peeps.count
//     }
// }

// const John = new Peeps('John');
// const Steve = new Peeps('Steve');
// const Amy = new Peeps('Amy');

// console.log(Amy.id);
// console.log(Steve.id);
// console.log(John.id);
// console.log(Peeps.count);


//Getters and Setters
// class Bands {
//     private dataState: string[];

//     constructor() {
//         this.dataState = [];
//     };

//     public get data(): string[] {
//         return this.dataState;
//     };

//     public set data(value: string[]) {
//         if (Array.isArray(value) && value.every(el => typeof el === 'string')) {
//             this.dataState = value;
//             return;
//         }else{
//             throw new Error ('Param is not an array of strings');
//         };
//     };
// };

// const MyBands = new Bands();
// MyBands.data = ['Newl Young', 'Led Zep'];
// console.log(MyBands.data);
// MyBands.data = [...MyBands.data, 'ZZ Top'];
// console.log(MyBands.data);
// // MyBands.data = ['Van Halen', 5510];


// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Index Signatures & keyof Assertions %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//This is usefull when we're creating an object but we don't know the names of the object keys, or the shape of the object and we can declare the type of the keys and values

// interface Transactions {
//     readonly [index: string]: number;
// };

// interface Transactions {
//     //This is an index signature, and it just declares that we know all of the keys will be strings and all of the values will be numbers. Also, this would allow other properties to be added to an object that was
//     //created with this interface
//     readonly [index: string]: number;
//     Pizza: number,
//     Books: number,
//     Job: number
// };

// const todaysTransactions: Transactions = {
//     Pizza: -10,
//     Books: -5,
//     Job: 50,
//     Dave: 50,
// };

// console.log(todaysTransactions.Pizza);
// console.log(todaysTransactions['Pizza']);

// let prop: string = 'Pizza';
// // console.log(todaysTransactions[prop]);

// function todaysNet(transactions: Transactions): Number {
//     let total = 0;
//     for(const transaction in transactions){
//         total += transactions[transaction];
//     };

//     return total;
// }

// console.log(todaysNet(todaysTransactions));
// // todaysTransactions.Pizza = 40; //Index signature in type Transactions only permits reading, not setting up values in.
// console.log(todaysTransactions['Dave']);


//Exercise #2
// interface Student {
//     [key: string]: string | number | number[] | undefined, //We need to put "undefined" in because we could get "undefined" in the "classes" parameter because of the question mark. We can get rid of it if we have just classes: number[]
//     name: string,
//     GPA: number,
//     classes?: number[]
// };

// const student: Student = {
//     name: "Doug",
//     GPA: 3.5,
//     classes: [100, 200]
// };

// console.log(student.test);

// for (const key in student){
//     //Method 1: Using idex signatures
//     console.log(`${key}: ${student[key]}`);

//     //Method 2: Using 'keyof' and assertion. This method works when we want to iterate through an object we've created without and intex signature provided.
//     console.log(`${key}: ${student[key as keyof Student]}`); //What 'keyof' does is that it creates a union type and the union type is the specific string literal. So it's a union type of 'name', 'GPA' and 'classes'. key as keyof Student ==> key = "name" | "GPA" | "classes".
// };

//Exercise #3
// interface Student {
//     [key: string]: string | number | number[] | undefined, //We need to put "undefined" in because we could get "undefined" in the "classes" parameter because of the question mark. We can get rid of it if we have just classes: number[]
//     name: string,
//     GPA: number,
//     classes?: number[]
// };

// const student: Student = {
//     name: "Doug",
//     GPA: 3.5,
//     classes: [100, 200]
// };

// // 1. typeof student        --> retrieves the type of the "student" object which is "Student" (based on the interface defined). So, typeof student is equivalent to Student.
// // 2. keyof typeof student  --> Extracts the keys of the Student type as a union of string literal types. This is equivalent to: type StudentKeys = keyof StudentType; // "name" | "GPA" | "classes"
// // 3. key as keyof typeof student --> Type Assertion tells TS to treat key as one of the keys of the Student type. It's Needed because Object.keys(student) returns an array of strings(string[]).
// //    However, not all strings are valid keys of Student. By asserting 'key as keyof typeof student', you're informing TS that key is definitely one of the valid keys, ensuring type safety.
// // 4. student[key as keyof typeof student] --> It accesses the property of student using the key, with TS now aware that key is a valid key, and returns the value associated with the specified key,
// //    with the correct type(string | number | number[] | undefined).
// //TS's type system is structural and static, meaning it checks types at compile time based on the structure of the code. When you use Object.keys, TS infers the keys as generic string types,
// //which are not guaranteed to match the actual keys of the Student interface. This can lead to type errors because TS cannot ensure that key is a valid property of student.
// //By using key as keyof typeof student, you:
// //  1. Assert Correctness: You're telling TS that key is indeed one of the keys defined in the Student interface.
// //  2. Enhance Type Safety: TS can now provide better type checking and IntelliSense support because it knows the exact keys you're working with.
// //  3. Prevent Errors: Avoid potential runtime errors by ensuring that only valid keys are accessed.
// const arr = Object.keys(student).map(function (key) { // This makes an array of the keys in the student object --> ["name", "GPA", "classes"]
//     return console.log(student[key as keyof typeof student]);
// });


//Exercise #4
// function logStudentKey(student: Student, key: keyof Student): void{ //We're defining what we're going to use as the key inside teh function right here
//     console.log(`Student ${key}: ${student[key]}`);
// }

// logStudentKey(student, 'GPA');

//Exercise #5
// type Streams = 'salary' | 'bonus' | 'sidehustle';
// type Incomes = Record<Streams, number | string>; //It allow us to use string literals as the different types that are ewxpected. number | string menas that one of these values can be either string or number.

// const monthlyIncomes: Incomes = {
//     salary: 500,
//     bonus: 100,
//     sidehustle: 250
// };

// for(const key in monthlyIncomes){
//     console.log(monthlyIncomes[key as keyof Incomes]);
// }



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Generics %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// function echo<T>(arg: T): T {
//     return arg;
// };

//Exercise #1
// function isObj<T>(arg: T): boolean {
//     return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null);
// };

// console.log(isObj(true));
// console.log(isObj('John'));
// console.log(isObj([1, 2, 3]));
// console.log(isObj({ name: 'John' }));
// console.log(isObj(null));

//Exercise #2
// function isObj<T>(arg: T): boolean {
//     return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null);
// };

// function isTrue<T>(arg: T): { val: T, is: boolean } {
//     if (Array.isArray(arg) && !arg.length) return { val: arg, is: false }

//     if (isObj(arg) && !Object.keys(arg as keyof T)) return { val: arg, is: false }

//     return {
//         val: arg,
//         is: !!arg
//     }
// };

// console.log(isTrue(false))
// console.log(isTrue(0))
// console.log(isTrue(true))
// console.log(isTrue(1))
// console.log(isTrue('Dave'))
// console.log(isTrue(''))
// console.log(isTrue(null))
// console.log(isTrue(undefined))
// console.log(isTrue({})) // modified
// console.log(isTrue({ name: 'Dave' }))
// console.log(isTrue([])) // modified
// console.log(isTrue([1, 2, 3]))
// console.log(isTrue(NaN))
// console.log(isTrue(-0))

//Exercise #3: Using interface
// interface BoolCheck<T> {
//     value: T,
//     is: boolean
// }

// function isObj<T>(arg: T): boolean {
//     return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null);
// };

// function isTrue<T>(arg: T): BoolCheck<T> {
//     if (Array.isArray(arg) && !arg.length) return { value: arg, is: false }

//     if (isObj(arg) && !Object.keys(arg as keyof T)) return { value: arg, is: false }

//     return {
//         value: arg,
//         is: !!arg
//     }
// };

//Exercise #4: extends
// interface HasId {
//     id: number
// }

// function processUser<T extends HasId>(user: T): T {
//     return user;
// };

// console.log(processUser({ id: 1, name: "german" }));
// // console.log(processUser({ name: "german" }));


//Exercise #5:
// interface HasId {
//     id: number
// };

// interface Geo {
//     lat: string;
//     lng: string;
// }

// interface Address {
//     street: string;
//     suite: string;
//     city: string;
//     zipcode: string;
//     geo: Geo;
// }

// interface Company{
//     name: string;
//     catchPhrase: string;
//     bs: string;
// }

// interface User {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//     address: Address;
//     phone: string;
//     website: string
//     company: Company
// }



// // T extends HasId --> The generic T is constrained to types that have at least an id property (from the HasId interface).
// // K extends keyof T --> The generic K represents a key of the type T. This means K can be any string literal type that corresponds to a property of T, such as "id" or also "name", "username", "email", etc.
// // T[K] --> This is TS's way of looking up the type of the property K in the object T. So if K = "id", then T["id"] will refer to the type of id, which in this case is number.
// //     Put another way, it T[K] represents the type of the property K for the object T. For example, if T is an object with { id: number; name: string; }, and K = "id", then T[K] is number.
// //     T[K] refers to a single value of the property K. But you are working with an array of objects (users: T[]), and you want to extract that property from every object, resulting in an array of values.
// // T[K][] --> The reason you use T[K][] (an array of T[K]) instead of just T[K] in the function's return type is because of how the map function works in TypeScript and JavaScript.
// //     Since the function works on an array of users (T[]), it extracts the K property from each user and collects all of those property values into an array.
// //     Therefore, if T[K] is number(for id), the result is an array of numbers: number[].
// //     Hence, the return type of the function is T[K][], which means "an array of values of type T[K]".
// //     If you just used T[K] instead of T[K][], the return type would indicate that the function returns a single value of type T[K], which is incorrect because you're actually returning an array of values.
// //     T[K] represents a single property value (like number or string), not an array of them.
// //     For example, this would imply that getUsersProperty(users, "id") should return just one id(like 1), instead of an array of IDs([1, 2, 3]), which is not what you want.
// //     You need to use T[K][] because:
// //      > The function operates on an array(T[]) and returns an array.
// //      > The map function produces a new array where each element is of type T[K], so the entire result is of type T[K][] (an array of the property values).
// //     Without the[], you'd be implying that the function only returns a single value of type T[K], which is incorrect for this situation.
// // users.map(user => user[key]); --> map is a higher-order function that operates on arrays. It iterates over an array and applies a function to each element, returning a new array of results.
// //     In this case, you are calling users.map(user => user[key]). For each user in users, it extracts the value of the property key (which has type T[K]), and then it returns an array of those values.
// //     map always returns an array, so your function should return an array as well.
// function getUsersProperty<T extends HasId, K extends keyof T>(users: T[], key: K): T[K][] {
//     return users.map(user => user[key]);
// };

// const usersArray: User[] = [
//     {
//         "id": 1,
//         "name": "Leanne Graham",
//         "username": "Bret",
//         "email": "Sincere@april.biz",
//         "address": {
//             "street": "Kulas Light",
//             "suite": "Apt. 556",
//             "city": "Gwenborough",
//             "zipcode": "92998-3874",
//             "geo": {
//                 "lat": "-37.3159",
//                 "lng": "81.1496"
//             }
//         },
//         "phone": "1-770-736-8031 x56442",
//         "website": "hildegard.org",
//         "company": {
//             "name": "Romaguera-Crona",
//             "catchPhrase": "Multi-layered client-server neural-net",
//             "bs": "harness real-time e-markets"
//         }
//     },
//     {
//         "id": 2,
//         "name": "Ervin Howell",
//         "username": "Antonette",
//         "email": "Shanna@melissa.tv",
//         "address": {
//             "street": "Victor Plains",
//             "suite": "Suite 879",
//             "city": "Wisokyburgh",
//             "zipcode": "90566-7771",
//             "geo": {
//                 "lat": "-43.9509",
//                 "lng": "-34.4618"
//             }
//         },
//         "phone": "010-692-6593 x09125",
//         "website": "anastasia.net",
//         "company": {
//             "name": "Deckow-Crist",
//             "catchPhrase": "Proactive didactic contingency",
//             "bs": "synergize scalable supply-chains"
//         }
//     },
// ];

// console.log(getUsersProperty(usersArray, "email"));
// console.log(getUsersProperty(usersArray, "username"));

//Exercise #6:
// class StateObject<T> {
//     private data: T

//     constructor(value: T) {
//         this.data = value
//     }

//     get state(): T {
//         return this.data
//     }

//     set state(value: T) { //Remember that setters don't return anything
//         this.data = value
//     }
// };

// const storedString = new StateObject<string>("John"); //This also works --> const storedString = new StateObject("John");
// console.log(storedString.state);
// storedString.state = "Dave";
// // storedString.state = 12; //Instantly, after we assign John, TS interred that's the type of our state (string) and it's not going to accept another type. In this case, "number". (We must pass at least 1 type in StateObject, otherwise we'll get an error)

// const storedNumber = new StateObject<number>(22); // This also works --> const storedNumber = new StateObject(22);
// console.log(storedNumber.state);
// storedNumber.state = 66;
// // storedNumber.state = "Dave"; //Instantly, after we assign 22, TS interred that's the type of our state (number) and it's not going to accept another type. In this case, "string". (We must pass at least 1 type in StateObject, otherwise we'll get an error)

// const myState = new StateObject<(string | number | boolean)[]>([]); //Before we pass anything in yet we'll use angle brackets and we're going to say this is going to accept an array of "string", "number" or "boolean".
// myState.state = ['Dave', 42, true];
// console.log(myState.state);



// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% Utility Types %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// (Constructs a type with all properties of Type set to optional.This utility will return a type that represents all subsets of a given type.)

//Exercise #1: Using Partial 
interface Assignment {
    studentId: string,
    title: string,
    grade: number,
    verified?: boolean
};

function updateAssignment(assign: Assignment, propsToUptdate: Partial<Assignment>): Assignment {
    return {
        ...assign,
        ...propsToUptdate //This allow us to not pass in all of the props but declare that they are props of assignment
    }
};

const assign1: Assignment = {
    studentId: "compscil123",
    title: "Final Project",
    grade: 0
};

console.log(updateAssignment(assign1, {grade: 95}));
const assignGraded: Assignment = updateAssignment(assign1, {grade: 96});

//Exercise #2: Using Request and Readonly 
function recordAssignment(assign: Required<Assignment>): Assignment { //It requires all of the properties. By putting "Required", the utility type with the assignment, that means 'verified' and all of the other properties are now required
    return assign;
};

const asssignVerified: Readonly<Assignment> = {
    ...assignGraded,
    verified: true
};

// asssignVerified.grade = 89;
// recordAssignment(assignGraded);
recordAssignment({...assignGraded, verified: true});


//Exercise #3: Using Record
const hexColorMap: Record<string, string> = {
    red: "FF000",
    green: "00FF00",
    blue: "000FF"
};

type Students = "Sara" | "Kelly"
type LetterGrades = "A" | "B" | "C" | "D" | "U"

interface Grades {
    assign1: number,
    assign2: number,
}

const finalGrades: Record<Students, LetterGrades> = {
    Sara: "B",
    Kelly: "U"
}

const gradeData: Record<Students, Grades> = {
    Sara: { assign1: 85, assign2: 93 },
    Kelly: { assign1: 76, assign2: 15 },
};


//Exercise #4: Using Pick and Omit
type AssignResult = Pick<Assignment, "studentId" | "grade">

const score: AssignResult = {
    studentId: "k123",
    grade: 85,
}

type AssignPreview = Omit<Assignment, "grade" | "verified">
const preview: AssignPreview = {
    studentId: "k123",
    title: "Final Project",
};

//Exercise #5: Using Exclude and Extract
type adjustedGrade = Exclude<LetterGrades, "U">
type highGrades = Extract<LetterGrades, "A" | "B">


// Exercise #6: Using Nonnullable 
type AllPossibleGrades = 'Dave' | 'John' | null | undefined
type NamesOnly = NonNullable<AllPossibleGrades>


//Exercise #7: Using ReturnType 
// type newAssign = { title: string, points: number }
function createNewAssign (title: string, points: number){
    return { title, points }
}

type NewAssign = ReturnType<typeof createNewAssign>
const tsAssign: NewAssign = createNewAssign("Utility Types", 100)
console.log(tsAssign);


//Exercise #8: Using Parameters 
type AssignParams = Parameters<typeof createNewAssign>
const assignArgs: AssignParams = ["Generics", 100]
const tsAssign2: NewAssign = createNewAssign(...assignArgs)
console.log(tsAssign2)


//Exercise #9: Using Awaited - helps us with the ReturnType of a Promise 
interface User {
    id: number,
    name: string,
    username: string,
    email: string,
}

async function fetchUsers(): Promise<User[]>{
    try {
        const data = await fetch('https://jsonplaceholder.typicode.com/users');
        return await data.json();
    } catch (err) {
        if (err instanceof Error) console.log(err.message);
        return []; //The function does not return anything in the catch block, which might lead to undefined behavior. You can return an empty array or some other fallback value in case of failure. In case of an error, it returns an empty array instead of undefined.
    }
}

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>
fetchUsers().then(users => console.log(users))