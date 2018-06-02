import db from '../models/index';
import { ContainerAttributes, ContainerInstance } from '../models/container';

import { DAO } from '../dao';
import { NOT_FOUND } from '../../lib/errors';
import { NoteInstance } from '../..';

export interface IContainerChildren {
    containers: ContainerInstance[],
    notes: NoteInstance[]
}

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
    async getAll(): Promise<ContainerInstance[]> {
        return db.container.findAll();
    }

    async get(id: number): Promise<ContainerInstance> {
        let container = await db.container.findById(id);
        
        if (!container) {
            throw NOT_FOUND;
        } else {
            return container;
        }
    }

    async create(attributes: ContainerAttributes): Promise<ContainerInstance> {
        return db.container.create(attributes);
    }

    async update(id: number, attributes: Partial<ContainerAttributes>): Promise<ContainerInstance> {
        return this.get(id)
            .then(container => container.update(attributes))
            .then(() => this.get(id));
    }

    async delete(id: number): Promise<void> {
        return this.get(id)
            .then(container => container.destroy());
    }

    async getChildren(id: number): Promise<IContainerChildren> {
        let parent = await this.get(id);

        let containers = await parent.getContainers();
        let notes = await parent.getNotes();

        return {
            containers,
            notes
        }
    }
}