import {execFile} from "node:child_process";

function execFileFunc(){
    execFile('./somefile.sh', (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });    
};

export {execFileFunc};