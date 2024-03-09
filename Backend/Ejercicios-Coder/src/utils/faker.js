import { faker } from '@faker-js/faker';

// faker.locale = 'es'; //Idioma de los datos

function generateUser(){
    let numOfProducts = parseInt(faker.number.int(1, { bannedDigits: ['0'] }));
    // Crear una lista de roles posibles
    const roles = ['admin', 'usuario', 'editor', 'invitado'];
    let products = [];
    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct());
    }
    return {
        name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        sex: faker.person.sex(),
        birthDate: faker.date.birthdate(),
        products: products,
        image: faker.image.avatar(),
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email(),
        rol: roles[Math.floor(Math.random() * roles.length)]
    };
};

function generateProduct(){
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        stock: faker.number.int(1),
        id: faker.database.mongodbObjectId(),
        image: faker.image.avatar()
    }
};

export {generateUser};

// https://fakerjs.dev/api/