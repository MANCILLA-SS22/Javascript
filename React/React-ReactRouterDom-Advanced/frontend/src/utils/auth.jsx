import { redirect } from "react-router-dom";

function getAuthToken(){
    const token = localStorage.getItem("token");
    if(!token) return null;

    const tokenDuration = getTokenDuration();
    if(tokenDuration < 0) return "EXPIRED";
    return token
};

function tokenLoader(){
    return getAuthToken();
}

function checkAuthLoader(){ // this function will be added in the next lecture make sure it looks like this in the end
    const token = getAuthToken();
    if (!token) return redirect('/auth');
    return null; // this is missing in the next lecture video and should be added by you
}

function getTokenDuration(){
    const storedExpirationDate = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export {getAuthToken, tokenLoader, checkAuthLoader, getTokenDuration};