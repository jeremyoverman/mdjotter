import * as Sequelize from 'sequelize';
import db from '../models/index';
import { NoteInstance, NoteAttributes } from '../models/note';

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
    getAll() {
        return db.note.findAll();
    }

    get(id: number) {
        return db.note.findById(id, {
            rejectOnEmpty: true
        }).catch(() => {
            throw NOT_FOUND;
        });
    }

    create(attributes: NoteAttributes) {
        return db.note.create(attributes);
    }

    update(id: number, attributes: Partial<NoteAttributes>) {
        return this.get(id)
            .then(note => note.update(attributes))
            .then(() => this.get(id));
    }

    delete(id: number) {
        return this.get(id)
            .then(note => note.destroy());
    }

    async search(user_id: string, query: string) {
        let user = await db.user.DAO.get(user_id);

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