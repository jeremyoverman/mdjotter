import * as supertest from 'supertest';
import * as setup from '../support/setup';

import db from '../../sequelize/models';
import app from '../../app';

/* yeo: imports */
import * as NoteSupport from '../support/model/note';

describe('In the note controller', () => {
    setup.sequelize();

    /**
     * See https://github.com/visionmedia/supertest for more information on testing
     * controllers.
     */

    /* yeo: specs */
    describe('calling GET /note', () => {
        beforeEach(() => NoteSupport.create(2));

        it('should return a 200', () => {
            return supertest(app)
                .get('/note')
                .expect(200);
        });

        it('should return an array of notes', () => {
            return supertest(app)
                .get('/note')
                .then(res => {
                    expect(res.body.length).toBe(2);
                });
        });
    });

    describe('calling GET /note/{note_id}', () => {
        beforeEach(() => NoteSupport.create());

        describe('with a good id', () => {
            it('should return a 200', () => {
                return supertest(app)
                    .get('/note/1')
                    .expect(200);
            });

            it('should return the note', () => {
                return supertest(app)
                    .get('/note/1')
                    .then(res => {
                        expect(res.body).toEqual(jasmine.objectContaining(NoteSupport.goodAttributes));
                    });
            });
        });

        describe('with a bad id', () => {
            it('should return a 404', () => {
                return supertest(app)
                    .get('/note/2')
                    .expect(404);
            });
        });
    });

    describe('calling POST /note', () => {
        describe('with good attributes', () => {
            it('should return a 201', () => {
                return supertest(app)
                    .post('/note')
                    .send(NoteSupport.goodAttributes)
                    .expect(201);
            });

            it('should return the note', () => {
                return supertest(app)
                    .post('/note')
                    .send(NoteSupport.goodAttributes)
                    .then(res => {
                        expect(res.body).toEqual(jasmine.objectContaining(NoteSupport.goodAttributes));
                    });
            });

            it('should create the note', () => {
                return supertest(app)
                    .post('/note')
                    .send(NoteSupport.goodAttributes)
                    .then(res => {
                        return db.note.findById(1, { rejectOnEmpty: true }).then(note => {
                            expect(note).toEqual(jasmine.objectContaining(NoteSupport.goodAttributes));
                        });
                    });
            });
        });

        describe('with bad attributes', () => {
            it('should return a 400', () => {
                return supertest(app)
                    .post('/note')
                    .send(NoteSupport.badAttributes)
                    .expect(400);
            });

            it('should not create the note', () => {
                return supertest(app)
                    .post('/note')
                    .send(NoteSupport.badAttributes)
                    .then(() => {
                        return db.note.findAll().then(notes => {
                            expect(notes.length).toBe(0);
                        });
                    });
            });
        });
    });

    describe('calling PATCH /note/{note_id}', () => {
        beforeEach(() => NoteSupport.create());

        describe('with a good id', () => {
            describe('and good attributes', () => {
                it('should return a 200', () => {
                    return supertest(app)
                        .patch('/note/1')
                        .send(NoteSupport.goodUpdateAttributes)
                        .expect(200);
                });

                it('should return the note', () => {
                    return supertest(app)
                        .patch('/note/1')
                        .send(NoteSupport.goodUpdateAttributes)
                        .then(res => {
                            expect(res.body).toEqual(jasmine.objectContaining(NoteSupport.goodUpdateAttributes));
                        });
                });

                it('should update the note', () => {
                    return supertest(app)
                        .patch('/note/1')
                        .send(NoteSupport.goodUpdateAttributes)
                        .then(res => {
                            return db.note.findById(1).then(note => {
                                expect(note).toEqual(jasmine.objectContaining(NoteSupport.goodUpdateAttributes));
                            });
                        });
                });
            });

            describe('and bad attributes', () => {
                it('should return a 400', () => {
                    return supertest(app)
                        .patch('/note/1')
                        .send(NoteSupport.badAttributes)
                        .expect(400);
                });

                it('should not update the note', () => {
                    return supertest(app)
                        .patch('/note/1')
                        .send(NoteSupport.badAttributes)
                        .then(res => {
                            return db.note.findById(1).then(note => {
                                expect(note).toEqual(jasmine.objectContaining(NoteSupport.goodAttributes));
                            });
                        })
                });
            });
        });

        describe('with a bad id', () => {
            it('should return a 404', () => {
                return supertest(app)
                    .patch('/note/2')
                    .send(NoteSupport.goodAttributes)
                    .expect(404);
            });
        });
    });

    describe('calling DELETE /note/{note_id}', () => {
        beforeEach(() => NoteSupport.create());

        describe('with a good id', () => {
            it('should return a 204', () => {
                return supertest(app)
                    .delete('/note/1')
                    .expect(204)
            });

            it('should delete the note', () => {
                return supertest(app)
                    .delete('/note/1')
                    .then(res => {
                        return db.note.findById(1).then(note => {
                            expect(note).toBe(null);
                        });
                    })
            });
        });

        describe('with a bad id', () => {
            it('should return a 404', () => {
                return supertest(app)
                    .delete('/note/2')
                    .expect(404);
            });
        });
    });
});