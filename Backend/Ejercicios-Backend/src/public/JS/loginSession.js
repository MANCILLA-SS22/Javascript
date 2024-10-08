const form = document.getElementById('loginForm');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const obj = {}; //Creamos un objeto ADICIONAL donde se guardara la informacion que esta dentro del formulario para despues poderla enviar.
    const data = new FormData(form);
    data.forEach((value, key) => obj[key] = value); //Buscamos dentro del objeto la propiedad obj[key], la cual primeramente es "email". Al no existir, esta se crea como clave, y su valor sera "value". NO debemos poner obj["key"] porque entonces se crearan objetos clave/ valor, en los cuales la clave siempre sera "key", y no "email" y luego "password".        
    console.log("Objeto formado: ", obj);    
    fetch('/api/session/login', {
    // fetch('/api/extend/users/login',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { 
            'Content-Type': 'application/json',
        }
    })
    .then(function(result){
        if (result.status === 200){
            result.json().then(function(json){
                window.location.replace('/usersSession');
            })
        }
    });
});