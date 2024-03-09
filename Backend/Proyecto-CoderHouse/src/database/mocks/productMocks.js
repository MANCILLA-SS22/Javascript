import { faker } from '@faker-js/faker';

function generateMock(num){
    const product = [];

    for (let i = 0; i < num; i++) {
        const infoProduct = { 
            id: i+1,
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumbail: faker.image.avatar(),
            code: faker.datatype.number(),
            stock: faker.datatype.number(),
            status: true,
            category: faker.commerce.product()
        }
        product.push(infoProduct);
    }
    return product;
};

export {generateMock}