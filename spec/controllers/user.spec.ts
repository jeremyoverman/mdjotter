import * as supertest from 'supertest';
import * as setup from '../support/setup';

import db from '../../sequelize/models';
import app from '../../app';

/* yeo: imports */
import * as UserSupport from '../support/model/user';

describe('In the user controller', () => {
    setup.sequelize();

    /**
     * See https://github.com/visionmedia/supertest for more information on testing
     * controllers.
     */

    /* yeo: specs */
    describe('calling GET /user', () => {
        beforeEach(() => UserSupport.create(2));

        it('should return a 200', () => {
            return supertest(app)
                .get('/user')
                .expect(200);
        });

        it('should return an array of users', () => {
            return supertest(app)
                .get('/user')
                .then(res => {
                    expect(res.body.length).toBe(2);
                });
        });
    });

    describe('calling GET /user/{user_id}', () => {
        beforeEach(() => UserSupport.create());

        describe('with a good id', () => {
            it('should return a 200', () => {
                return supertest(app)
                    .get('/user/1')
                    .expect(200);
            });

            it('should return the user', () => {
                return supertest(app)
                    .get('/user/1')
                    .then(res => {
                        expect(res.body).toEqual(jasmine.objectContaining(UserSupport.goodAttributes));
                    });
            });
        });

        describe('with a bad id', () => {
            it('should return a 404', () => {
                return supertest(app)
                    .get('/user/2')
                    .expect(404);
            });
        });
    });

    describe('calling POST /user', () => {
        describe('with good attributes', () => {
            it('should return a 201', () => {
                return supertest(app)
                    .post('/user')
                    .send(UserSupport.goodAttributes)
                    .expect(201);
            });

            it('should return the user', () => {
                return supertest(app)
                    .post('/user')
                    .send(UserSupport.goodAttributes)
                    .then(res => {
                        expect(res.body).toEqual(jasmine.objectContaining(UserSupport.goodAttributes));
                    });
            });

            it('should create the user', () => {
                return supertest(app)
                    .post('/user')
                    .send(UserSupport.goodAttributes)
                    .then(res => {
                        return db.user.findById(1, { rejectOnEmpty: true }).then(user => {
                            expect(user).toEqual(jasmine.objectContaining(UserSupport.goodAttributes as any));
                        });
                    });
            });
        });

        describe('with bad attributes', () => {
            it('should return a 400', () => {
                return supertest(app)
                    .post('/user')
                    .send(UserSupport.badAttributes)
                    .expect(400);
            });

            it('should not create the user', () => {
                return supertest(app)
                    .post('/user')
                    .send(UserSupport.badAttributes)
                    .then(() => {
                        return db.user.findAll().then(users => {
                            expect(users.length).toBe(0);
                        });
                    });
            });
        });
    });

    describe('calling PATCH /user/{user_id}', () => {
        beforeEach(() => UserSupport.create());

        describe('with a good id', () => {
            describe('and good attributes', () => {
                it('should return a 200', () => {
                    return supertest(app)
                        .patch('/user/1')
                        .send(UserSupport.goodUpdateAttributes)
                        .expect(200);
                });

                it('should return the user', () => {
                    return supertest(app)
                        .patch('/user/1')
                        .send(UserSupport.goodUpdateAttributes)
                        .then(res => {
                            expect(res.body).toEqual(jasmine.objectContaining(UserSupport.goodUpdateAttributes));
                        });
                });

                it('should update the user', () => {
                    return supertest(app)
                        .patch('/user/1')
                        .send(UserSupport.goodUpdateAttributes)
                        .then(res => {
                            return db.user.findById(1).then(user => {
                                expect(user).toEqual(jasmine.objectContaining(UserSupport.goodUpdateAttributes as any));
                            });
                        });
                });
            });

            describe('and bad attributes', () => {
                it('should return a 400', () => {
                    return supertest(app)
                        .patch('/user/1')
                        .send(UserSupport.badAttributes)
                        .expect(400);
                });

                it('should not update the user', () => {
                    return supertest(app)
                        .patch('/user/1')
                        .send(UserSupport.badAttributes)
                        .then(res => {
                            return db.user.findById(1).then(user => {
                                expect(user).toEqual(jasmine.objectContaining(UserSupport.goodAttributes as any));
                            });
                        })
                });
            });
        });

        describe('with a bad id', () => {
            it('should return a 404', () => {
                return supertest(app)
                    .patch('/user/2')
                    .send(UserSupport.goodAttributes)
                    .expect(404);
            });
        });
    });

    describe('calling DELETE /user/{user_id}', () => {
        beforeEach(() => UserSupport.create());

        describe('with a good id', () => {
            it('should return a 204', () => {
                return supertest(app)
                    .delete('/user/1')
                    .expect(204)
            });

            it('should delete the user', () => {
                return supertest(app)
                    .delete('/user/1')
                    .then(res => {
                        return db.user.findById(1).then(user => {
                            expect(user).toBe(null);
                        });
                    })
            });
        });

        describe('with a bad id', () => {
            it('should return a 404', () => {
                return supertest(app)
                    .delete('/user/2')
                    .expect(404);
            });
        });
    });
});