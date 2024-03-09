import colors from "colors"

function generateProductErrorInfo(data){
    return `
        Alguno de los datos son inválidos. La lista de propiedades requeridas son:
            -> Título: Se esperaba un string, se recibió: ${data.title ? colors.green(data.title) : colors.red(data.title)}
            -> Description: Se esperaba un string, se recibió: ${data.description ? colors.green(data.description) : colors.red(data.description)} 
            -> Price: Se esperaba un number, se recibió: ${data.price ? colors.green(data.price) : colors.red(data.price)}
            -> Thumbail: Se esperaba un string, se recibió: ${data.thumbnail ? colors.green(data.thumbnail) : colors.red(data.thumbnail)}
            -> Code: Se esperaba un string, se recibió: ${data.code ? colors.green(data.code) : colors.red(data.code)}
            -> Stock: Se esperaba un number, se recibió: ${data.stock ? colors.green(data.stock) : colors.red(data.stock)}
            -> Status: Se esperaba un boolean, se recibió: ${data.status ? colors.green(data.status) : colors.red(data.status)}
            -> Category: Se esperaba un string, se recibió: ${data.category ? colors.green(data.category) : colors.red(data.category)}
    `;
};

export {generateProductErrorInfo}