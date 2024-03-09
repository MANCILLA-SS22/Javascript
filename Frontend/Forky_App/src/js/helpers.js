import { TIMEOUT_SEC } from "./config";

/*
export async function getJSON(url){ //We create a function and export it, called getJSON. it's gonna be an async function which will basically do the fetching and also converting to JSON all in one step. With this, we abstract all this functionality into one nice function that we can then use all over our project.
    try {
        const fetchPro = fetch(url);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); //Both fetch and timeout function return a new promise. So, remmber that we Promise.race() when we want to run two promoses at the same time and get the result of the promise that has FIRST been completed. So, if the request lasts more than 10 seconds, then the timeout function will be executed first than the other one and the rest of the code won't be executed.
        const data = await res.json();
        // console.log(res, data);

        if(!res.ok) throw new Error(`Hello, ${data.message} (${res.status})`);

        return data;

    } catch (err) {
        console.error(`${err} 🤮`);
        throw err; //We re-throw this error so the other file (helpers.js) can recive it.
    }
}

//DUDA
export async function sendJSON(url, uploadData){ //We create a function and export it, called getJSON. it's gonna be an async function which will basically do the fetching and also converting to JSON all in one step. With this, we abstract all this functionality into one nice function that we can then use all over our project.
    try {
        const fetchPro = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(uploadData)
        });

        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); //Both fetch and timeout function return a new promise. So, remmber that we Promise.race() when we want to run two promoses at the same time and get the result of the promise that has FIRST been completed. So, if the request lasts more than 10 seconds, then the timeout function will be executed first than the other one and the rest of the code won't be executed.
        const data = await res.json();
        // console.log(res, data);

        if(!res.ok) throw new Error(`Hello, ${data.message} (${res.status})`);

        return data;

    } catch (err) {
        console.error(`${err} 🤮`);
        throw err; //We re-throw this error so the other file (helpers.js) can recive it.
    }
}
*/

function timeout(num) {
    return new Promise(function (_, reject) { //We ignore the first parameter which stands for "resolve", because we're focus on only in the reject.
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${num} second`));
        }, num * 1000);
    });
};


export async function AJAX(url, uploadData = undefined){
    try {
        const fetchPro = uploadData 
        ? fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(uploadData)
            }) 
        : fetch(url);

        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); //Both fetch and timeout function return a new promise. So, remmber that we Promise.race() when we want to run two promoses at the same time and get the result of the promise that has FIRST been completed. So, if the request lasts more than 10 seconds, then the timeout function will be executed first than the other one and the rest of the code won't be executed.
        const data = await res.json();

        if(!res.ok) throw new Error(`Hello, ${data.message} (${res.status})`);
        return data;

    } catch (err) {
        throw err;
    }
}