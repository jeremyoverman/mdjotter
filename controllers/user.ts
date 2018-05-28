import db from '../sequelize/models';
import Controller from '../controller';
import * as Errors from '../lib/errors';

/* yeo: imports */
import { RawUserInstance, UserAttributes } from '../sequelize/models/user';

import { Get, Put, Post, Delete, Patch, Security, Tags, Route, Response, Body, SuccessResponse } from 'tsoa';
import { pbkdf2, generateRandomString } from '../lib/crypto';
import { createToken } from '../lib/jwt';

export interface ILoginBody {
    password: string;
}

export interface ICreateUserBody {
    username: string;
    password: string;
    email: string;
}

@Route('users')
@Tags('Users')
export class UserController extends Controller {
    /**
     * Controller methods go here. See TSOA documentation for details.
     */

    /* yeo: subroutes */
    /**
     * Get all users
     */
    @Get()

    getUsers(): PromiseLike < RawUserInstance[] > {
        return db.user.DAO.getAll();
    }

    /**
     * Get a single user
     * 
     * @param user_id The id of the user
     */
    @Get('{user_id}')
    @Response(404)

    getUser(user_id: string): PromiseLike < RawUserInstance | void > {
        return db.user.DAO.get(user_id).catch(err => {
            if (err === Errors.NOT_FOUND) this.setStatus(404);
        });
    }

    /**
     * Create a new user
     * 
     * @param attributes The attributes to create the user with
     */
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
    @Patch('{user_id}')
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
    @Delete('{user_id}')
    @Response(404)
    @Response(204)

    deleteUser(user_id: string): PromiseLike < void > {
        return db.user.DAO.delete(user_id).then(() => {
            this.setStatus(204);
        }).catch(err => {
            if (err === Errors.NOT_FOUND) this.setStatus(404);
        });
    }

    @Post('{user_id}/login')
    @Response(401)

    async login(user_id: string, @Body() body: ILoginBody) {
        let user = await db.user.DAO.get(user_id);

        if (user.password === await pbkdf2(body.password, user.salt)) {
            return { token: await createToken(user.username) };
        } else {
            this.setStatus(401);
        }
    }
}