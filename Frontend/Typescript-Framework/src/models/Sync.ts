import axios, { AxiosPromise } from "axios";

interface HasId{
    id?: number | string;
}

class Sync <T extends HasId>{ //(1)

    constructor(public rootUrl: string){}

    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`);
    }

    save(data: T): AxiosPromise {
        const {id} = data;
        if (id) return axios.put(`${this.rootUrl}/${id}`, data);
        return axios.post(this.rootUrl, data);
    }
}

export default Sync;

// What it means: The generic type T must extend (or conform to) the HasId interface, meaning it must have an id property of type number.
// Why it's important: This ensures that any type used for T in the Sync class has an id property, which is necessary for the save method to work correctly.
//If T didn't extend HasId, TypeScript wouldn't guarantee that data has an id property, leading to type errors or runtime failures.
//The T extends HasId pattern allows Sync to handle any data model that adheres to the HasId structure, making it reusable for various scenarios, such as managing users, products, or any resource with an id property.