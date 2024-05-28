import { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    let editablePlayer = <span className="player-name">{playerName}</span>;

    if (isEditing) editablePlayer = <input type="text" value={playerName} onChange={handleChange} required />; //Two-way binding method

    function handleEditClick() {
        // setIsEditing(isEditing ? false : true);
        // setIsEditing(!isEditing);
        setIsEditing(prevState => !prevState);
        if (isEditing) onChangeName(symbol, playerName);
        
    };

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayer}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}