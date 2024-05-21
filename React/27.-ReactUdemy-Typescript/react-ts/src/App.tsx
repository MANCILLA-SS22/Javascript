import NewTodo from './components/NewTodo';
import Todos from './components/Todos';
import TodosContextProvider from './store/todos-contex';

function App() {
  
  return (
    <TodosContextProvider >
      <NewTodo/>
      <Todos/>
    </TodosContextProvider>
  );
}

export default App;

//Non-null Assertion Operator (Postfix !):
//TypeScript also has a special syntax for removing null and undefined from a type without doing any explicit checking.Writing! after any expression is effectively a 
//type assertion that the value isn’t null or undefined.

//Interface:
//Inference is a powerful tool to spare you the effort of writing and reading types that are obvious or uninteresting. Omitting types in obvious cases also draws the 
//reader’s attention to explicit types when those types are important, for things like casts.
//An interface in TypeScript is a way to define a contract for the structure of an object. It is commonly used for describing the shape of objects and 
//ensuring that certain properties or methods exist. Interfaces can extend other interfaces, providing a mechanism for building on existing contracts. 
//They are often used for achieving structural typing.

//Type:
//The type keyword in TypeScript is used to create aliases for data types.It can be used for defining complex types, including unions, intersections, and mapped types.
//Unlike interfaces, type aliases are more flexible and can represent a wide range of data structures, including primitive types, union types, and more.
//Type aliases can be used with the extends keyword for intersection types and to create more complex type compositions.

//Class:
//Classes in TypeScript are similar to classes in other object - oriented languages.They allow you to create objects with properties and methods.
//They support concepts like encapsulation, inheritance, and polymorphism.
//Classes provide a way to create instances of objects with a specific structure and behavior.

//In practice, the choice between using an interface or a type often comes down to personal preference and the specific requirements of your code. Interfaces are 
//often preferred when defining object shapes, while type aliases are useful for creating more complex and flexible type definitions.Classes are used when you need 
//to model objects with behavior and state.It's worth noting that TypeScript provides a high degree of interoperability between interfaces and type aliases.

