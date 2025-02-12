import { FC, JSX, ReactNode } from "react"

interface ChildProps {
    color: string;
    onClick: () => void;
    children?: ReactNode;
}

function Child({ color, onClick, children }: ChildProps) {
    return (
        <div>
            {color}
            {children}
            <button onClick={onClick}>Click me</button>
        </div>
    )
}

function ChildAsFC1({ color, onClick, children }: ChildProps): JSX.Element {
    return (
        <div>
            {color}
            {children}
            <button onClick={onClick}>Click me</button>
        </div>
    )
}

const ChildAsFC2: FC<ChildProps> = ({ color, onClick, children }) => { //React.FC is used for typing arrow functions, not regular function components.
    return (
        <div>
            {color}
            {children}
            <button onClick={onClick}>Click me</button>
        </div>
    )
};

export { Child, ChildAsFC1, ChildAsFC2 }