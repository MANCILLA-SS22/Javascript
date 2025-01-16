"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(data) {
        this.data = data;
        this.events = {};
    }
    get(propName) {
        return this.data[propName]; //! (non-null assertion operator) tells TS to assume that the value at propName is not undefined or null. This is necessary because the properties in UserProps are optional (?).
    }
    set(update) {
        Object.assign(this.data, update);
    }
    on(eventName, callback) {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }
    trigger(eventName) {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0)
            return;
        handlers.forEach(function (callback) {
            return callback();
        });
    }
}
exports.default = User;
// get(propName: keyof UserProps): number | string | undefined {
//     return this.data[propName];
// }    
// get(propName: string): number | string | undefined {
//     return this.data[propName as keyof UserProps];
// }
