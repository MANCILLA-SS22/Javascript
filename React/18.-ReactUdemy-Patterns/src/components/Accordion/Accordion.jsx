import { createContext, useContext, useState } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

const AccordionContext = createContext();

export function useAccordionContext(){ //Custom hook
    const ctx = useContext(AccordionContext);
    if(!ctx) throw Error('Accordion-related component must be wrapped by <Accordion>');
    return ctx;
}

function Accordion({ children, className }) {
    const [openItemId, setOpenItemId] = useState();
    
    function toggleItem(id){
        setOpenItemId(function (prevId){
            return prevId === id ? null : id;
        });
    };

    const contextValue = { openItemId, toggleItem };

    return (
        <>
            <AccordionContext.Provider value={contextValue}>
                <ul className={className}>
                    {children}
                </ul>
            </AccordionContext.Provider>
        </>
    );
};

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;

export default Accordion;