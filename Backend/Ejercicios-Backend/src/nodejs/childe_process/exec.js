import {exec} from "node:child_process";

function execFunc(){
    exec("pdw", (error, stdout, stderr) => {
        if(error){
            console.log(`error: ${error.message}`);
            return;
        }
        
        if(stderr){
            console.log(`stderr: ${stderr}`);
            return;            
        }
        
        console.log(`stdout: ${stdout}`);
    
    });    
}

export {execFunc}