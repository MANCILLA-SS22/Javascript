const form = document.getElementById('form');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const obj = {}; //Creamos un objeto ADICIONAL donde se guardara la informacion que esta dentro del formulario para despues poderla enviar.
    const data = new FormData(form);
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(function(result){
        if (result.status === 201) window.location.replace('/login');
    })
    .catch(err => console.log(err));
});


// FormData es un objeto en JavaScript que se utiliza para construir fácilmente conjuntos de datos clave-valor que representan los campos y valores de un formulario HTML. Esto es útil cuando deseas enviar datos 
// de formulario a través de una solicitud HTTP, como una petición AJAX o una solicitud de formulario. Cuando creas una instancia de FormData y le pasas un formulario como argumento, la instancia de FormData
// automáticamente recopila todos los campos y sus valores del formulario y los organiza en un objeto que puedes manipular y enviar fácilmente.