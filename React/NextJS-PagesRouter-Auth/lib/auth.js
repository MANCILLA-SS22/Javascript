import { hash } from "bcrypt";


export async function hashPassword(password){
    return await hash(password, 12);
}