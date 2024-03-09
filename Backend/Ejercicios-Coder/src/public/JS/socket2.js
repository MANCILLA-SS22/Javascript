const socket  = io();

const form = document.querySelector("form");

form.addEventListener("submit", function(event){
    event.preventDefault();

    const formData = new FormData(form);

    const post = {
        userId: +formData.get("userId"),
        id: +formData.get("id"),
        title: formData.get("title"),
        body: formData.get("body")
    }

    socket.emit("post_send", post);

    form.reset(); //Esto sirve para limpiar los imputs
});

socket.on("posts", function(data){
    const posts = document.querySelector("#posts");

    posts.innerHTML = data.map(function(post){
        return `
            <p>
                Id: ${post.id} - User id: ${post.id} - Title: ${post.title} - Body: ${post.body}
            </p>
        `
    }).join(" ");
});