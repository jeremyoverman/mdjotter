import db from '../../../sequelize/models';
import { UserAttributes, UserInstance } from '../../../sequelize/models/user';

/**
 * Reusable attributes will go in here
 */

export async function create(number?: number ): Promise<UserInstance[]> {
    number = number ? number : 1;
    let promises = [];

    for (let i = 0; i < number; i++) {
        let promise = db.user.create(goodAttributes);
        promises.push(promise);
    }

    return Promise.all(promises);
}

/* yeo: attributes */

export const goodAttributes: UserAttributes = {
    email: 'test@email.com',
    password: '123',
    username: 'username'
};

export const goodUpdateAttributes: UserAttributes = {
    email: 'test2@email.com',
    password: 'asdf',
    username: 'user2'
};

export const badAttributes: any = {

};