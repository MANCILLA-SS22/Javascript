import { forwardRef } from "react";

const Input = forwardRef (function Input({ label, textarea, ...props }, ref){ 
    const clases = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    let res;
    textarea ? res = <textarea className={clases} ref={ref} {...props} /> : res = <input className={clases} ref={ref} {...props} />;

    return (
        <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
            {res}
        </p>
    );
});

export default Input;

/* function Input(props){ 

    const clases = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

    return (
        <p className="flex flex-col gap-1 my-4">
            <label className="text-sm font-bold uppercase text-stone-500">{props.label}</label>
            {props.textarea ? <textarea className={clases}/> : <input className={clases} {...props}/> }
        </p>
    )
}

export default Input; */