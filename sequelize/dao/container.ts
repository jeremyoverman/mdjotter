import db from '../models/index';
import { ContainerAttributes } from '../models/container';

import { DAO } from '../dao';
import { NOT_FOUND } from '../../lib/errors';

export class ContainerDAO < I, A > extends DAO {
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
    async getAll() {
        return db.container.findAll();
    }

    async get(id: number) {
        let container = await db.container.findById(id);
        
        if (!container) {
            throw NOT_FOUND;
        } else {
            return container;
        }
    }

    async create(attributes: ContainerAttributes) {
        return db.container.create(attributes);
    }

    async update(id: number, attributes: Partial<ContainerAttributes>) {
        return this.get(id)
            .then(container => container.update(attributes))
            .then(() => this.get(id));
    }

    async delete(id: number) {
        return this.get(id)
            .then(container => container.destroy());
    }

    async getChildren(id: number) {
        let parent = await this.get(id);

        let containers = await parent.getContainers();
        let notes = await parent.getNotes();

        return {
            containers,
            notes
        }
    }
}