import db from '../models/index';
import { UserAttributes } from '../models/user';

import { DAO } from '../dao';
import { NOT_FOUND } from '../../lib/errors';
import { generateRandomString } from '../../lib/crypto';

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

    async get(id: string) {
        let user = await db.user.findById(id);

        if (!user) {
            throw NOT_FOUND;
        } else {
            return user;
        }
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

    async getContainers (id: string) {
        let user = await this.get(id);

        if (!user) {
            throw NOT_FOUND;
        } else {
            return user.getContainers({
                where: {
                    parentId: null
                }
            } as any);
        }
    }

    async generateSecret(id: string) {
        let user = await this.get(id);
        let secret = generateRandomString(32)

        await user.update({ secret });

        return secret;
    }

    async getNotes (id: string) {
        let user = await this.get(id);

        return user.getNotes();
    }
}