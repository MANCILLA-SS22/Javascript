import { useEffect, useState, useCallback } from "react";

function UserDetail({ userId }){
    const [user, setUser] = useState({});

    const getUser = useCallback(async () => { //Esta funcion se volvera a crear SOLO si el "userId" cambia. 
        const response = await fetch('https://peticiones.online/api/users/' + userId);
        const json = await response.json();
        console.log(json);
        setUser(json);
    }, [userId]);

    useEffect(() => {
        getUser(); //La funcion que cresmo arriba solo se renderizara cuando haya cambiado. De lo contrario, si conservamos el mismo id, no se ejecutara dentro de este useEffect.
    }, [getUser]);

    return <div>
        <p>{user.first_name}</p>
    </div>

}

export default UserDetail;