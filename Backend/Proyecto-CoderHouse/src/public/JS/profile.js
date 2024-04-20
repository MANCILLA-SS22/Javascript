const profile = document.getElementById("profile");
const logout = document.getElementById("logout");

window.onload = function(e){
    fetch(`http://localhost:5500/api/sessions/current`)
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.log(error));
}

logout.addEventListener("click", function(event){ //   /api/auth/logout
    event.preventDefault();

    async function logout(){
        const res = await fetch("http://localhost:5500/api/auth/logout");
        alert("Has cerrado sesion")
        window.location.replace(res.url)
        console.log("Logout --> ", res)
    }
    logout();
});

function procesarDatos(data){
    profile.innerHTML =  (`
        <h2>Profile</h2>
        <p>Name: ${data.first_name} ${data.last_name}</p>
        <p>Age: ${data.age}</p>
        <p>Email: ${data.email}</p>
        <p>Role: ${data.role}</p>
    `);
};