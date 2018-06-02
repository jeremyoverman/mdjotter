import * as supertest from 'supertest';
import * as setup from '../support/setup';

import db from '../../sequelize/models';
import app from '../../app';

/* yeo: imports */
import * as ContainerSupport from '../support/model/container';

describe('In the container controller', () => {
    setup.sequelize();

    /**
     * See https://github.com/visionmedia/supertest for more information on testing
     * controllers.
     */

    /* yeo: specs */
    describe('calling GET /container', () => {
        beforeEach(() => ContainerSupport.create(2));

        it('should return a 200', () => {
            return supertest(app)
                .get('/container')
                .expect(200);
        });

        it('should return an array of containers', () => {
            return supertest(app)
                .get('/container')
                .then(res => {
                    expect(res.body.length).toBe(2);
                });
        });
    });

    describe('calling GET /container/{container_id}', () => {
        beforeEach(() => ContainerSupport.create());

        describe('with a good id', () => {
            it('should return a 200', () => {
                return supertest(app)
                    .get('/container/1')
                    .expect(200);
            });

            it('should return the container', () => {
                return supertest(app)
                    .get('/container/1')
                    .then(res => {
                        expect(res.body).toEqual(jasmine.objectContaining(ContainerSupport.goodAttributes));
                    });
            });
        });

        describe('with a bad id', () => {
            it('should return a 404', () => {
                return supertest(app)
                    .get('/container/2')
                    .expect(404);
            });
        });
    });

    describe('calling POST /container', () => {
        describe('with good attributes', () => {
            it('should return a 201', () => {
                return supertest(app)
                    .post('/container')
                    .send(ContainerSupport.goodAttributes)
                    .expect(201);
            });

            it('should return the container', () => {
                return supertest(app)
                    .post('/container')
                    .send(ContainerSupport.goodAttributes)
                    .then(res => {
                        expect(res.body).toEqual(jasmine.objectContaining(ContainerSupport.goodAttributes));
                    });
            });

            it('should create the container', () => {
                return supertest(app)
                    .post('/container')
                    .send(ContainerSupport.goodAttributes)
                    .then(res => {
                        return db.container.findById(1, { rejectOnEmpty: true }).then(container => {
                            expect(container).toEqual(jasmine.objectContaining(ContainerSupport.goodAttributes as any));
                        });
                    });
            });
        });

        describe('with bad attributes', () => {
            it('should return a 400', () => {
                return supertest(app)
                    .post('/container')
                    .send(ContainerSupport.badAttributes)
                    .expect(400);
            });

            it('should not create the container', () => {
                return supertest(app)
                    .post('/container')
                    .send(ContainerSupport.badAttributes)
                    .then(() => {
                        return db.container.findAll().then(containers => {
                            expect(containers.length).toBe(0);
                        });
                    });
            });
        });
    });

    describe('calling PATCH /container/{container_id}', () => {
        beforeEach(() => ContainerSupport.create());

        describe('with a good id', () => {
            describe('and good attributes', () => {
                it('should return a 200', () => {
                    return supertest(app)
                        .patch('/container/1')
                        .send(ContainerSupport.goodUpdateAttributes)
                        .expect(200);
                });

                it('should return the container', () => {
                    return supertest(app)
                        .patch('/container/1')
                        .send(ContainerSupport.goodUpdateAttributes)
                        .then(res => {
                            expect(res.body).toEqual(jasmine.objectContaining(ContainerSupport.goodUpdateAttributes));
                        });
                });

                it('should update the container', () => {
                    return supertest(app)
                        .patch('/container/1')
                        .send(ContainerSupport.goodUpdateAttributes)
                        .then(res => {
                            return db.container.findById(1).then(container => {
                                expect(container).toEqual(jasmine.objectContaining(ContainerSupport.goodUpdateAttributes as any));
                            });
                        });
                });
            });

            describe('and bad attributes', () => {
                it('should return a 400', () => {
                    return supertest(app)
                        .patch('/container/1')
                        .send(ContainerSupport.badAttributes)
                        .expect(400);
                });

                it('should not update the container', () => {
                    return supertest(app)
                        .patch('/container/1')
                        .send(ContainerSupport.badAttributes)
                        .then(res => {
                            return db.container.findById(1).then(container => {
                                expect(container).toEqual(jasmine.objectContaining(ContainerSupport.goodAttributes as any));
                            });
                        })
                });
            });
        });

        describe('with a bad id', () => {
            it('should return a 404', () => {
                return supertest(app)
                    .patch('/container/2')
                    .send(ContainerSupport.goodAttributes)
                    .expect(404);
            });
        });
    });

    describe('calling DELETE /container/{container_id}', () => {
        beforeEach(() => ContainerSupport.create());

        describe('with a good id', () => {
            it('should return a 204', () => {
                return supertest(app)
                    .delete('/container/1')
                    .expect(204)
            });

            it('should delete the container', () => {
                return supertest(app)
                    .delete('/container/1')
                    .then(res => {
                        return db.container.findById(1).then(container => {
                            expect(container).toBe(null);
                        });
                    })
            });
        });

        describe('with a bad id', () => {
            it('should return a 404', () => {
                return supertest(app)
                    .delete('/container/2')
                    .expect(404);
            });
        });
    });
});