//Method 1
import { ChangeEvent, DragEvent, JSX } from "react";

function EventComponents(): JSX.Element{

    function onChange(event: ChangeEvent<HTMLInputElement>){
        console.log(event);
    }

    function onDragStart(event: DragEvent<HTMLDivElement>) {
        console.log(event);
    }

    return (
        <div>
            <input onChange={onChange} />
            <div draggable onDragStart={onDragStart}>
                Drag me!
            </div>
        </div>
    )
};

export {EventComponents};

//Method2
/* import { ChangeEvent, JSX } from "react";

function EventComponents(): JSX.Element{
    return (
        <div>
            <input onChange={event => console.log(event)} />
        </div>
    )
};

export { EventComponents }; */