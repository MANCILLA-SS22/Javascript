import { showAlert } from "./alert.js"

async function updateSettings(data, type){ //type is either password or data
    try {
        let url; //               --> /api/v1/users/updateMyPassword  o esto  /api/v1/users/updateMe <-- Usar esto cuando la app esta en produccion
        type === 'password' ? url = 'http://localhost:5500/api/v1/users/updateMyPassword' : url = 'http://localhost:5500/api/v1/users/updateMe';
        
        const res = await axios({
            method: "PATCH",
            url: url,
            data: data
        });

        if(res.data.status === "success"){
            showAlert("success", `${type.toUpperCase()} updated successfully!`);
            //window.setTimeout(() => location.reload(), 1000);
        }

    } catch (error) {
        showAlert("error", error.response.data.message)
    }
} 

export {updateSettings}