import {CustomError}  from "../CustomErrors.js";
import { EErrors } from "../enumErrors.js";
import { generateProductErrorInfo } from "../messages/product-creation-error.message.js";

function productError(data){
    CustomError.createError({
        name: "Error al crear el producto",
        cause: generateProductErrorInfo(data),
        message: "Error tratando de crear al usuario",
        code: EErrors.INVALID_TYPES_ERROR
    });
}
export {productError};