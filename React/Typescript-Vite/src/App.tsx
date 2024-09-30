import { ReactNode, useState } from "react";
import Counter from "./components/Counter";
import Heading from "./components/Heading";
import Section from "./components/Section";
import List from "./components/List";

function App() {
  const [count, setCount] = useState<number>(1)
  return (
    <>
      <Heading title={"Hello!!"} />
      <Section title={"Different Title"}>This is my section.</Section>
      <Counter setCount={setCount}>Count is {count}</Counter>
      <List items={["☕ Coffee", "🌮 Tacos", "💻 Code"]} render={function (item: string): ReactNode { return <span className="bold">{item}</span> }}/>
    </>
  )
}

export default App;

//(1)
// If you're getting an error when using the function keyword with the render prop, it might be because TypeScript needs to infer the return type properly within JSX, and there's sometimes a stricter requirement 
// when using traditional functions versus arrow functions in such cases. Here are a few common reasons:
//  1. "this" Context: The function keyword creates a different this context compared to an arrow function. Arrow functions inherit this from the surrounding context, while function creates its own this.
//     In React components, using function might lead to issues where the context is not correctly set, especially if you try to use this within the function.
//  2. Implicit this Usage: If the function keyword is used inside a component where you need to refer to this, TypeScript may not infer the correct type or scope, leading to an error. Arrow functions are preferred 
//     because they don't create their own "this" and thus align better with modern React patterns.
//  3. Differences in TypeScript Inference: TypeScript infers the types differently for arrow functions and traditional functions. With the function keyword, you need to ensure the types match explicitly, 
//     whereas arrow functions often allow TypeScript to infer the correct types more easily.
//Using arrow functions is more concise and avoids the common pitfalls of this context issues. This is why arrow functions are often preferred for inline callbacks in React components.
// :ReactNode --> ensures that TypeScript understands the type and does not raise an error.