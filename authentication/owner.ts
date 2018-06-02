import { NOT_OWNER } from '../lib/errors';

export interface IOwnerMethods {
    [type: string]: (resource: any, decodedUsername: string) => Promise<any>;
}

const methods: IOwnerMethods = {
    async user(username: string, decodedUsername: string) {
        if (username === decodedUsername) {
            return Promise.resolve();
        }

        return Promise.reject(NOT_OWNER);
    }
};

export default methods;