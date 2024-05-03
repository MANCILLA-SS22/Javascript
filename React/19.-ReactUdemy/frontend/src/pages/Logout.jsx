import { redirect } from "react-router-dom";

function logoutAction(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return redirect("/");
}

export {logoutAction}