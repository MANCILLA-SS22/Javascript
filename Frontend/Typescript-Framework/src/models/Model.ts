import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
    get<K extends keyof T>(key: K): T[K];
    set(value: T): void;
    getAll(): T;
}

interface Sync<T> {
    fetch(id: number | string): AxiosPromise;
    save(data: T): AxiosPromise
}

interface Events {
    on(eventName: string, callback: () => void): void;
    trigger(eventName: string): void;
}

interface HasId {
    id?: number | string;
}

class Model<T extends HasId> {
    constructor(private attributes: ModelAttributes<T>, private events: Events, private sync: Sync<T>) {}

    // //Method 1
    // on = this.events.on;
    // trigger = this.events.trigger;
    // get = this.attributes.get;

    // Method 2
    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    get get() {
        return this.attributes.get;
    }

    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger("change");
    }

    async fetch(): Promise<void> {
        try {
            const id: T["id"] = this.get('id');
            if (typeof id !== 'number' && typeof id !== 'string') throw new Error('Cannot fetch without an id');
            const response: AxiosResponse = await this.sync.fetch(id);
            this.set(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async save(): Promise<void> {
        try {
            const response: AxiosResponse = await this.sync.save(this.attributes.getAll());
            this.trigger("save")
            console.log('response', response);
        } catch (error) {
            console.log('error');
        }
    }
}

export { Model, HasId }