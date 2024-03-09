function llamarApi() {
    console.log("Llamando api users!!!");
    const get = JSON.parse(localStorage.getItem("data"));
    fetch(`/users/${get.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${get.authToken}`
        }
    }).then(result => {
        if (result.status === 200) {
            result.json()
                .then(json => {
                    console.log("1. ", json);
                });
        } else if (result.status === 401) {
            console.log(result);
            alert("Login invalido revisa tus credenciales!");
        }
    })
};
llamarApi();