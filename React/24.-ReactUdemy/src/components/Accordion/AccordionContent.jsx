import { useAccordionContext } from "./Accordion.jsx";
import { useAccordionItemContext } from "./AccordionItem.jsx";

function AccordionContent({ className, children}) {
    const { openItemId } = useAccordionContext();
    const id = useAccordionItemContext();

    let isOpen;
    if (openItemId === id) isOpen = true;

    return (
        <>
            <div className={isOpen ? `${className ?? ""} open` : `${className ?? ""} close`}>{children}</div>
        </>
    )
}

export default AccordionContent;