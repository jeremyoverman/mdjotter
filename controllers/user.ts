import db from '../sequelize/models';
import Controller from '../controller';
import * as Errors from '../lib/errors';

/* yeo: imports */
import { RawUserInstance, UserAttributes } from '../sequelize/models/user';

import { Get, Put, Post, Delete, Patch, Security, Tags, Route, Response, Body, SuccessResponse } from 'tsoa';
import { pbkdf2, generateRandomString } from '../lib/crypto';
import { createToken } from '../lib/jwt';
import { RawContainerInstance, ContainerAttributes, IRawContainerChildren } from '../sequelize/models/container';
import { RawNoteInstance, NoteAttributes } from '../sequelize/models/note';

export interface ILoginBody {
    password: string;
}

export interface ICreateUserBody {
    username: string;
    password: string;
    email: string;
}

export interface ICreateContainerParams {
    parentId?: number;
    name: string;
}

export interface ICreateNoteParams {
    title: string;
    contents?: string;
    containerId: number;
}

export interface ILoginResponse {
    token: string
}

export interface ISearchBody {
    query: string;
}

export interface IUserResponseBody {
    username: string;
    email: string;
}

@Route('users')
export class UserController extends Controller {
    /**
     * Get a single user
     * 
     * @param user_id The id of the user
     */
    @Tags('Users')
    @Get('{user_id}')
    @Response(404)

    async getUser(user_id: string): Promise< IUserResponseBody | void > {
        return db.user.DAO.get(user_id).then(user => {
            return {
                username: user.username,
                email: user.email
            }
        }).catch(err => {
            if (err === Errors.NOT_FOUND) this.setStatus(404);
        });
    }

    /**
     * Create a new user
     * 
     * @param attributes The attributes to create the user with
     */
    @Tags('Users')
    @Post()
    @Response(201)
    @Response(400)

    async createUser(@Body() attributes: ICreateUserBody): Promise< RawUserInstance > {
        let salt = generateRandomString(32);
        let createAttributes = {
            ...attributes,
            password: await pbkdf2(attributes.password, salt),
            salt: salt
        }
        return db.user.DAO.create(createAttributes).then(user => {
            this.setStatus(201);
            return user;
        });
    }

    /**
     * Update an existing user
     * 
     * @param user_id The id of the user
     * @param attributes The attributes to update the user with
     */
    @Tags('Users')
    @Patch('{user_id}')
    @Security('owner', ['user'])
    @Response(404)
    @Response(400)

    updateUser(user_id: string, @Body() attributes: UserAttributes): PromiseLike < RawUserInstance | void > {
        return db.user.DAO.update(user_id, attributes).catch(err => {
            if (err === Errors.NOT_FOUND) this.setStatus(404);
        });
    }

    /**
     * Delete an existing user
     * 
     * @param user_id The id of the user
     */
    @Tags('Users')
    @Delete('{user_id}')
    @Security('owner', ['user'])
    @Response(404)
    @Response(204)

    deleteUser(user_id: string): PromiseLike < void > {
        return db.user.DAO.delete(user_id).then(() => {
            this.setStatus(204);
        }).catch(err => {
            if (err === Errors.NOT_FOUND) this.setStatus(404);
        });
    }

    @Tags('Containers')
    @Get('{user_id}/containers')
    @Security('owner', ['user'])

    async getContainers(user_id: string): Promise<RawContainerInstance[] | void> {
        return db.user.DAO.getContainers(user_id);
    }

    @Tags('Containers')
    @Post('{user_id}/login')
    @Response(401)

    async login(user_id: string, @Body() body: ILoginBody): Promise<ILoginResponse> {
        let user = await db.user.DAO.get(user_id);

        if (user.password === await pbkdf2(body.password, user.salt)) {
            return { token: await createToken(user.username) };
        } else {
            this.setStatus(401);
        }
    }

    /**
     * Get a single container
     * 
     * @param container_id The id of the container
     */
    @Tags('Containers')
    @Get('{user_id}/containers/{container_id}')
    @Security('owner', ['user'])
    @Response(404)

    getContainer(container_id: number): PromiseLike < RawContainerInstance | void > {
        return db.container.DAO.get(container_id).catch(err => {
            if (err === Errors.NOT_FOUND) this.setStatus(404);
        });
    }

    /**
     * Create a new container
     * 
     * @param attributes The attributes to create the container with
     */
    @Tags('Containers')
    @Post('{user_id}/containers')
    @Security('owner', ['user'])
    @Response(201)
    @Response(400)

    async createContainer(user_id: string, @Body() params: ICreateContainerParams): Promise< RawContainerInstance > {
        let attributes = {
            ownerId: user_id,
            ...params
        };

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
    @Tags('Containers')
    @Patch('{user_id}/containers/{container_id}')
    @Security('owner', ['user'])
    @Response(404)
    @Response(400)

    updateContainer(container_id: number, @Body() params: Partial<ICreateContainerParams>): PromiseLike < RawContainerInstance | void > {
        return db.container.DAO.update(container_id, params).catch(err => {
            if (err === Errors.NOT_FOUND) this.setStatus(404);
        });
    }

    /**
     * Delete an existing container
     * 
     * @param container_id The id of the container
     */
    @Tags('Containers')
    @Delete('{user_id}/containers/{container_id}')
    @Security('owner', ['user'])
    @Response(404)
    @Response(204)

    deleteContainer(container_id: number): PromiseLike < void > {
        return db.container.DAO.delete(container_id).then(() => {
            this.setStatus(204);
        }).catch(err => {
            if (err === Errors.NOT_FOUND) this.setStatus(404);
        });
    }

    @Tags('Containers')
    @Get('{user_id}/containers/{container_id}/children')
    @Security('owner', ['user'])

    async getChildren(container_id: number): Promise<IRawContainerChildren> {
        return db.container.DAO.getChildren(container_id);
    }

    /**
     * Get all notes
     */
    @Tags('Notes')
    @Security('owner', ['user'])
    @Get('{user_id}/notes')

    getNotes(user_id: string): Promise<RawNoteInstance[]> {
        return db.user.DAO.getNotes(user_id);
    }

    /**
     * Get a single note
     * 
     * @param note_id The id of the note
     */
    @Tags('Notes')
    @Security('owner', ['user'])
    @Get('{user_id}/notes/{note_id}')
    @Response(404)

    getNote(note_id: number): PromiseLike < RawNoteInstance | void > {
        return db.note.DAO.get(note_id).catch(err => {
            if (err === Errors.NOT_FOUND) this.setStatus(404);
        });
    }

    /**
     * Create a new note
     * 
     * @param attributes The attributes to create the note with
     */
    @Tags('Notes')
    @Security('owner', ['user'])
    @Post('{user_id}/notes')
    @Response(201)
    @Response(400)

    createNote(user_id: string, @Body() params: ICreateNoteParams): PromiseLike < RawNoteInstance > {
        let attributes = {
            ownerId: user_id,
            ...params
        };

        return db.note.DAO.create(attributes).then(note => {
            this.setStatus(201);
            return note;
        });
    }

    /**
     * Update an existing note
     * 
     * @param note_id The id of the note
     * @param attributes The attributes to update the note with
     */
    @Tags('Notes')
    @Security('owner', ['user'])
    @Patch('{user_id}/notes/{note_id}')
    @Response(404)
    @Response(400)

    updateNote(note_id: number, @Body() attributes: Partial<ICreateNoteParams>): PromiseLike < RawNoteInstance | void > {
        return db.note.DAO.update(note_id, attributes).catch(err => {
            if (err === Errors.NOT_FOUND) this.setStatus(404);
        });
    }

    /**
     * Delete an existing note
     * 
     * @param note_id The id of the note
     */
    @Tags('Notes')
    @Security('owner', ['user'])
    @Delete('{user_id}/notes/{note_id}')
    @Response(404)
    @Response(204)

    deleteNote(note_id: number): PromiseLike < void > {
        return db.note.DAO.delete(note_id).then(() => {
            this.setStatus(204);
        }).catch(err => {
            if (err === Errors.NOT_FOUND) this.setStatus(404);
        });
    }

    @Tags('Notes')
    @Security('owner', ['user'])
    @Post('{user_id}/notes/search')

    searchNotes (user_id: string, @Body() params: ISearchBody): Promise<RawNoteInstance[]> {
        return db.note.DAO.search(user_id, params.query);
    }
}