class Attribute <T extends object> { //(1)

    constructor(private data: T) { }

    // get(propName: keyof T): number | string | undefined {
    //     return this.data[propName];
    // }    

    // get(propName: string): number | string | undefined {
    //     return this.data[propName as keyof T];
    // }

    // get<K extends keyof T>(propName: K): number | string {
    //     console.log('this.data[propName]', this.data[propName]);
    //     return this.data[propName]!; //! (non-null assertion operator) tells TS to assume that the value at propName is not undefined or null. This is necessary because the properties in T are optional (?).
    // }

    get(propName: string): number | string {
        return this.data[propName];
    }    

    set(update: T): void {
        Object.assign(this.data, update);
    }
}

export {Attribute}

//(1)
// The generic type T must be an object(i.e., it cannot be a primitive type like number, string, or boolean).
// <T extends object> matters here because The code accesses properties on this.data using this.data[propName].If T were not constrained to object, TypeScript would raise a type error,
// as primitives like number or string don’t have properties. So, this ensures that this.data is always an object, so accessing properties dynamically (this.data[propName]) is valid.
// Without <T extends object>, developers might accidentally use non - object types, leading to bugs or confusing runtime behavior.

// The set method uses Object.assign to merge update into this.data. For this to work, both this.data and update must be objects.
// Without the constraint, TypeScript would allow update to be a primitive type, which would break the logic.