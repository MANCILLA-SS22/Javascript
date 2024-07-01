import { useRef, useState } from 'react';

export default function SearchableList({ items, itemKeyFn, children }) {
    const lastChange = useRef();
    const [searchTerm, setSearchTerm] = useState('');

    const searchResults = items.filter((item) => JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase()) );

    function handleChange(event) {
        if(lastChange.current) clearTimeout(lastChange.current);

        lastChange.current = setTimeout(() => {
            lastChange.current = null;
            setSearchTerm(event.target.value);
        }, 500);
    }

    return (
        <div className="searchable-list">
            <input type="search" placeholder="Search" onChange={handleChange} />
            <ul>
                {searchResults.map(item => <li key={itemKeyFn(item)}>{children(item)}</li>) }
            </ul>
        </div>
    );
};

//Usamos useRef() en lugar de crear una variable global porque este hook se usa para mantener valores persistentes entre renders: useRef puede almacenar valores que persisten entre renderizados 
//sin causar un nuevo render. Esto es útil para almacenar cualquier tipo de valor que no deba desencadenar un nuevo renderizado del componente, como contadores, instancias de clases, o cualquier 
//estado mutable que no esté relacionado con la renderización.