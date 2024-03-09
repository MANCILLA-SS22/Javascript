// import axios from 'axios';
import { showAlert } from './alert.js';

async function login (email, password){
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:5500/api/v1/users/login', //  --> /api/v1/users/login <-- Usar esto cuando la app esta en produccion
            data: {
                email,
                password
            }
        });
        console.log(res)
    if (res.data.status === 'success') {
        showAlert('success', 'Logged in successfully!');
        window.setTimeout(() => {
            location.assign('/');
        }, 1500);
    }

    }catch (err) {
        console.log(err)
        showAlert('error', err.response.data.message);
    }
};

async function logout(){
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:5500/api/v1/users/logout'  //  --> /api/v1/users/logout <-- Usar esto cuando la app esta en produccion
        });
        if ((res.data.status = 'success')){
            //This location.reload(true) will force a reload from the server and not from browser cache. Otherwise, it might simply load the same page from the cache which would then still have our user 
            //menu, and we really want a fresh page coming down from the server
            location.reload(true);
        }
    
    }catch (err) {
        console.log(err.response);
        showAlert('error', 'Error logging out! Try again.');
    }
};

export {login , logout};