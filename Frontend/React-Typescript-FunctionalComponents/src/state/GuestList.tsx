import { JSX, useState } from 'react';

function GuestList(): JSX.Element{
    const [name, setName] = useState('');
    const [guests, setGuests] = useState<string[]>([]);

    function onClick(){
        setName("");
        setGuests([...guests, name]);
    }

    return (
        <div>
            <h3>Guest List</h3>
            <ul>
                {guests.map(guest => <li key={guest}>{guest}</li>) }
            </ul>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <button onClick={onClick}>Add Guest</button>
        </div>
    );
};

export {GuestList};

