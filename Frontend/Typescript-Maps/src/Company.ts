import { faker } from "@faker-js/faker";

class Company {
    companyName: string;
    catchPhrase: string;
    location: {
        lat: number;
        lng: number;
    };

    constructor() {
        this.companyName = faker.company.name();
        this.catchPhrase = faker.company.catchPhrase();
        this.location = {
            lat: faker.location.latitude(),
            lng: faker.location.longitude(),
        };
    }

    MarkerContent(): string {
        return `
        <div>
            <h1>Company Name: ${this.companyName}</h1>
            <h3>CatchPhrase: ${this.catchPhrase}</h3>
        </div>
        `;
    };
}

export { Company }