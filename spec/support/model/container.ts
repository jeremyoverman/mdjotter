import db from '../../../sequelize/models';
import { ContainerAttributes, ContainerInstance } from '../../../sequelize/models/container';

/**
 * Reusable attributes will go in here
 */

export async function create(number?: number ): Promise<ContainerInstance[]> {
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