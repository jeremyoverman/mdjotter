import db from '../models/index';
import { UserAttributes, UserInstance } from '../models/user';

import { DAO } from '../dao';
import { NOT_FOUND } from '../../lib/errors';
import { generateRandomString } from '../../lib/crypto';
import { ContainerInstance, NoteInstance } from '../..';

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
    async getAll(): Promise<UserInstance[]> {
        return db.user.findAll();
    }

    async get(id: string): Promise<UserInstance> {
        let user = await db.user.findById(id);

        if (!user) {
            throw NOT_FOUND;
        } else {
            return user;
        }
    }

    async create(attributes: UserAttributes): Promise<UserInstance> {
        return db.user.create(attributes);
    }

    async update(id: string, attributes: UserAttributes): Promise<UserInstance> {
        return this.get(id)
            .then(user => user.update(attributes))
            .then(() => this.get(id));
    }

    async delete(id: string): Promise<void> {
        return this.get(id)
            .then(user => user.destroy());
    }

    async getContainers (id: string): Promise<ContainerInstance[]> {
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

    async generateSecret(id: string): Promise<string> {
        let user = await this.get(id);
        let secret = generateRandomString(32)

        await user.update({ secret });

        return secret;
    }

    async getNotes (id: string): Promise<NoteInstance[]> {
        let user = await this.get(id);

        return user.getNotes();
    }
}