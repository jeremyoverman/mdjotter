import * as Sequelize from 'sequelize';
import db from '../models/index';
import { UserInstance, UserAttributes } from '../models/user';

import { DAO } from '../dao';
import { NOT_FOUND } from '../../lib/errors';

export class UserDAO < I, A > extends DAO {
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
        return db.user.findAll();
    }

    get(id: string) {
        return db.user.findById(id, {
            rejectOnEmpty: true
        }).catch(() => {
            throw NOT_FOUND;
        });
    }

    create(attributes: UserAttributes) {
        return db.user.create(attributes);
    }

    update(id: string, attributes: UserAttributes) {
        return this.get(id)
            .then(user => user.update(attributes))
            .then(() => this.get(id));
    }

    delete(id: string) {
        return this.get(id)
            .then(user => user.destroy());
    }
}