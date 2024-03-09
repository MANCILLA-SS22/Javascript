const profile = document.getElementById("profile");
const header = document.getElementById("header");

window.onload = function(e){
    fetch(`http://localhost:5500/api/sessions/current`)
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.log(error));
}

function procesarDatos(data){
    console.log(data)
    profile.innerHTML =  (`
        <p>Name: ${data.name}</p>
        <h2>Profile</h2>
        <p>Age: ${data.age}</p>
        <p>Email: ${data.email}</p>
        <p>Role: ${data.role}</p>
    `);
}