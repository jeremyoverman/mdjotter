import * as Sequelize from 'sequelize';
import db from '../models/index';
import { NoteAttributes, NoteInstance } from '../models/note';

import { DAO } from '../dao';
import { NOT_FOUND } from '../../lib/errors';

export class NoteDAO < I, A > extends DAO {
    /**
     * Data Access Objects
     * 
     * Add any methods for talking to your model here. Note that this extends a parent
     * DAO class that, by default, doesn't do much. You can add common functionality
     * between all DAO's to that parent class for DRYness.
     * 
     * By default, this will get attached to your model with the DAO property.
     */

    /* yeo: methods */
    async getAll(): Promise<NoteInstance[]> {
        return db.note.findAll();
    }

    async get(id: number): Promise<NoteInstance> {
        let note = await db.note.findById(id);

        if (!note) {
            throw NOT_FOUND;
        } else {
            return note;
        }
    }

    async create(attributes: NoteAttributes): Promise<NoteInstance> {
        return db.note.create(attributes);
    }

    async update(id: number, attributes: Partial<NoteAttributes>): Promise<NoteInstance> {
        return this.get(id)
            .then(note => note.update(attributes))
            .then(() => this.get(id));
    }

    async delete(id: number): Promise<void> {
        return this.get(id)
            .then(note => note.destroy());
    }

    async search(user_id: string, query: string): Promise<NoteInstance[]> {
        return db.note.findAll({
            where: {
                ownerId: user_id,
                [Sequelize.Op.or]: {
                    title: {
                        [Sequelize.Op.like]: `%${query}%`
                    },
                    contents: {
                        [Sequelize.Op.like]: `%${query}%`
                    }
                }
            }
        });
    }
}