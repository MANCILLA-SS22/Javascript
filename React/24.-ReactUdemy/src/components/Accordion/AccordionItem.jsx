import { createContext, useContext } from "react";

const AccordionItemContext = createContext();

export function useAccordionItemContext() { //Custom hook
    const ctx = useContext(AccordionItemContext);
    if (!ctx) throw Error('AccordionItem-related component must be wrapped by <Accordion.Item>');
    return ctx;
}

function AccordionItem({ id, className, children }) {
    return (
        <AccordionItemContext.Provider value={id}>
            <li className={className}>{children}</li>
        </AccordionItemContext.Provider>
    )
}

export default AccordionItem;