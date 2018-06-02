import db from '../../../sequelize/models';
import { NoteAttributes, NoteInstance } from '../../../sequelize/models/note';

/**
 * Reusable attributes will go in here
 */

export async function create(number?: number ): Promise<NoteInstance[]> {
    number = number ? number : 1;
    let promises = [];

    for (let i = 0; i < number; i++) {
        let promise = db.note.create(goodAttributes);
        promises.push(promise);
    }

    return Promise.all(promises);
}

/* yeo: attributes */

export const goodAttributes: NoteAttributes = {
    containerId: 1,
    title: 'My Note',
    contents: 'My Contents',
    ownerId: 'user'
};

export const goodUpdateAttributes: NoteAttributes = {
    containerId: 2,
    title: 'My Second Note',
    contents: 'My Second Contents',
    ownerId: 'user2'
};

export const badAttributes: any = {

};