import db from '../../../sequelize/models';
import { ContainerAttributes } from '../../../sequelize/models/container';

/**
 * Reusable attributes will go in here
 */

export function create(number ? ) {
    number = number ? number : 1;
    let promises = [];

    for (let i = 0; i < number; i++) {
        let promise = db.container.create(goodAttributes);
        promises.push(promise);
    }

    return Promise.all(promises);
}

/* yeo: attributes */

export const goodAttributes: ContainerAttributes = {
    name: 'My Folder',
    ownerId: 'username',
};

export const goodUpdateAttributes: ContainerAttributes = {
    name: 'My Other Folder',
    ownerId: 'username'
};

export const badAttributes: any = {
};