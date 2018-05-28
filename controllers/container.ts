import db from '../sequelize/models';
import Controller from '../controller';
import { NOT_FOUND } from '../lib/errors';

/* yeo: imports */
import { RawContainerInstance, ContainerAttributes } from '../sequelize/models/container';
import { Get, Put, Post, Delete, Patch, Security, Tags, Route, Response, Body, SuccessResponse } from 'tsoa';

@Route('containers')
@Tags('Containers')
export class ContainerController extends Controller {
    /**
     * Controller methods go here. See TSOA documentation for details.
     */

    /* yeo: subroutes */
    /**
     * Get all containers
     */
    @Get()

    getContainers(): PromiseLike < RawContainerInstance[] > {
        return db.container.DAO.getAll();
    }

    /**
     * Get a single container
     * 
     * @param container_id The id of the container
     */
    @Get('{container_id}')
    @Response(404)

    getContainer(container_id: number): PromiseLike < RawContainerInstance | void > {
        return db.container.DAO.get(container_id).catch(err => {
            if (err === NOT_FOUND) this.setStatus(404);
        });
    }

    /**
     * Create a new container
     * 
     * @param attributes The attributes to create the container with
     */
    @Post()
    @Response(201)
    @Response(400)

    createContainer(@Body() attributes: ContainerAttributes): PromiseLike < RawContainerInstance > {
        return db.container.DAO.create(attributes).then(container => {
            this.setStatus(201);
            return container;
        });
    }

    /**
     * Update an existing container
     * 
     * @param container_id The id of the container
     * @param attributes The attributes to update the container with
     */
    @Patch('{container_id}')
    @Response(404)
    @Response(400)

    updateContainer(container_id: number, @Body() attributes: ContainerAttributes): PromiseLike < RawContainerInstance | void > {
        return db.container.DAO.update(container_id, attributes).catch(err => {
            if (err === NOT_FOUND) this.setStatus(404);
        });
    }

    /**
     * Delete an existing container
     * 
     * @param container_id The id of the container
     */
    @Delete('{container_id}')
    @Response(404)
    @Response(204)

    deleteContainer(container_id: number): PromiseLike < void > {
        return db.container.DAO.delete(container_id).then(() => {
            this.setStatus(204);
        }).catch(err => {
            if (err === NOT_FOUND) this.setStatus(404);
        });
    }
}