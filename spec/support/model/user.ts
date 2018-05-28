import db from '../../../sequelize/models';
import { UserAttributes } from '../../../sequelize/models/user';

/**
 * Reusable attributes will go in here
 */

export function create(number ? ) {
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
    passhash: '123',
    username: 'username'

};

export const goodUpdateAttributes: UserAttributes = {
    email: 'test2@email.com',
    passhash: 'asdf',
    username: 'user2'
};

export const badAttributes: any = {

};