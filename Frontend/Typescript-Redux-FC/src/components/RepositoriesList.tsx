import { FormEvent, JSX, useState } from "react";
import {useActions} from '../hooks/useActions'
import { useTypeSelector } from "../hooks/useTypedSelector";

function RepositoriesList(): JSX.Element{
    const [term, setTerm] = useState("");
    const {searchRepositories} = useActions();
    const { data, error, loading } = useTypeSelector(state => state.repositories);

    function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault();
        searchRepositories(term);
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={term} onChange={(e) => setTerm(e.target.value)}/>
                <button>Search</button>
            </form>
            {error && <h3>{error}</h3>}
            {loading && <h3>Loading...</h3>}
            {!error && !loading && data.map((name: string) => <div key={name}>{name}</div>) }
        </div>
    );
};

export default RepositoriesList;