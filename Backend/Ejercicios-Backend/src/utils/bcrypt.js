import bcrypt from 'bcrypt';

async function createHash(password){ //Generamos el hash.
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hashSync(password, salts); //genSaltSync genera un Salt de 10 caracteres. Un Salt es un string random que hace que el proceso de hasheo se realice de manera impredecible. Devuelve un string con el password hasheado. El proceso es irreversible
}

async function validateHash(user, password){ //Validamos el hash. 
    // console.log(`Datos a validar: user: ${user}, password: ${password}`);
    return bcrypt.compareSync(password, user.password); //compareSync toma primero la clave sin hashear y lo compara con la clave hasheada en la base de datos. Devolvera true o false dependiendo si la clave coincide o no
}

export {createHash, validateHash}