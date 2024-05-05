const profile = document.getElementById("profile");

window.onload = function(e){
    fetch(`http://localhost:5500/api/sessions/current`)
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.log(error));
}

function procesarDatos(data){
    profile.innerHTML =  (`
        <h2>Profile</h2>
        <p>Name: ${data.first_name} ${data.last_name}</p>
        <p>Age: ${data.age}</p>
        <p>Email: ${data.email}</p>
        <p>Role: ${data.role}</p>
        <a href="/products">Ver productos</a>
        <div>
            <button class="btn btn-dark" onclick="logout()">Logout</button>
        </div>
    `);
};

async function logout(){
    const res = await fetch("http://localhost:5500/api/auth/logout");
    alert("Has cerrado sesion")
    window.location.replace(res.url)
    // console.log("Logout --> ", res)
}