import path from "node:path"
import { fileURLToPath } from "url";
import { dirname } from "path";

function pathNodejs(){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
    // console.log(__filename);
    // console.log(__dirname);

    // console.log(path.basename(__filename));
    // console.log(path.basename(__dirname));

    // console.log(path.extname(__filename));
    // console.log(path.extname(__dirname));    

    // console.log(path.parse(__filename))
    // console.log(path.format(path.parse(__filename)));

    // console.log(path.isAbsolute(__filename));
    // console.log(path.isAbsolute("./data.json"));

    console.log(path.join("folder1", "folder2", "index.html"));
    console.log(path.resolve("folder1", "folder2", "index.html"));

    console.log(path.join("/folder1", "folder2", "index.html"));
    console.log(path.resolve("/folder1", "folder2", "index.html"));
    
    console.log(path.join("/folder1", "//folder2", "index.html"));
    console.log(path.resolve("/folder1", "//folder2", "index.html"));
    
    console.log(path.join("/folder1", "//folder2", "../index.html"));
    console.log(path.resolve("/folder1", "//folder2", "../index.html"));
    
    console.log(path.join(__dirname, "data.json"));
    console.log(path.resolve(__dirname, "data.json"));    
};

export {pathNodejs}