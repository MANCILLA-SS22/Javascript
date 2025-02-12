import { JSX, useEffect, useRef, useState } from "react";


const users = [
    { name: 'Sarah', age: 20 },
    { name: 'Alex', age: 20 },
    { name: 'Michael', age: 20 },
];

function UserSearch(): JSX.Element {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [name, setName] = useState('');
    const [user, setUser] = useState<{name: string; age: number} | undefined>();

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.focus();
    })

    function onClick(){
        const foundUser = users.find(function(user){
            return user.name === name;
        });

        setUser(foundUser);
    }

    return (
        <div>
            User Search
            <input ref={inputRef} value={name} onChange={e => setName(e.target.value)} />
            <button onClick={onClick}>Find User</button>
            <div>
                {user && user.name}
                {user && user.age}
            </div>
        </div>
    )
}

export { UserSearch }; 