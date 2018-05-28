import * as Sequelize from 'sequelize';
import db from '../models/index';
import { ContainerInstance, ContainerAttributes, RawContainerInstance } from '../models/container';

import { DAO } from '../dao';
import { NOT_FOUND } from '../../lib/errors';
import { RawNoteInstance } from '../models/note';

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
    getAll() {
        return db.container.findAll();
    }

    get(id: number) {
        return db.container.findById(id, {
            rejectOnEmpty: true
        }).catch(() => {
            throw NOT_FOUND;
        });
    }

    create(attributes: ContainerAttributes) {
        return db.container.create(attributes);
    }

    update(id: number, attributes: Partial<ContainerAttributes>) {
        return this.get(id)
            .then(container => container.update(attributes))
            .then(() => this.get(id));
    }

    delete(id: number) {
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