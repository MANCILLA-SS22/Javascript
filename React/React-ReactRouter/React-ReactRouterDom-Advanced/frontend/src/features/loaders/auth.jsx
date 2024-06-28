import { redirect } from "react-router-dom";
import { getAuthToken } from "../../utils/auth";

function tokenLoader(){
    return getAuthToken();
}

function checkAuthLoader(){ // this function will be added in the next lecture make sure it looks like this in the end
    const token = getAuthToken();
    if (!token) return redirect('/auth');
    return null; // this is missing in the next lecture video and should be added by you
}

export {tokenLoader, checkAuthLoader};