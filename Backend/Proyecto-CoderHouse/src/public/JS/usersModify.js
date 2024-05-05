const perfil = document.getElementById("perfil");
const eliminar = document.getElementById("eliminar");

window.onload = function(e){
    fetch(`http://localhost:5500/api/users`)
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.log(error));
}

function procesarDatos(data){
    perfil.innerHTML = "";
    data.forEach(function(event){
        let record = document.createElement("div")
        record.innerHTML = (`
            <div class="pb-5">
                <p>Name: ${event.first_name} ${event.last_name}</p>
                <p>Email: ${event.email}</p>
                <p>Role: ${event.role}</p>
                <button onclick="changeRole('${event.email}', '${event.role}')" class="btn btn-dark">Cambiar role</a></button>
                <button onclick="myFunc('${event.email}', '${event._id}', '${event.role}')" class="btn btn-dark">Eliminar usuario</a></button>
            </div>
        `);
        perfil.append(record);
    });
};

async function myFunc(email, id, role){
    if(role === "ADMIN" || email === "xxel.tiradorxx@gmail.com") return alert(`No se puede eliminar esta cuenta. Intentar con otra!`);
    await fetch(`http://localhost:5500/api/users/deleteOne/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    alert(`Has borrado este el correo de nombre: ${email}`);
}

async function changeRole(email, role){
    await fetch(`http://localhost:5500/api/users/premium/${email}`);
    alert(`El email "${email}" ha cambiado su role "${role}"`);
}