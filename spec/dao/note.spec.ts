import db from '../../sequelize/models/index';
import * as setup from '../support/setup';

import * as NoteSupport from '../support/model/note';

let dao = db.note.DAO;

describe('In the Note DAO', () => {
    setup.sequelize();

    /* yeo: specs */
    describe('calling the getAll method', () => {
        beforeEach(() => NoteSupport.create(2));

        it('should return an array of notes', () => {
            return dao.getAll().then(notes => {
                expect(notes.length).toBe(2);
            });
        });
    });

    describe('calling the get method', () => {
        beforeEach(() => NoteSupport.create());

        describe('with a good id', () => {
            it('should return the note', () => {
                return dao.get(1);
            });
        });

        describe('with a bad id', () => {
            it('should get rejected', () => {
                return dao.get(2).then(() => {
                    throw new Error('Should reject');
                }).catch(() => {});
            });
        });
    });

    describe('calling the create method', () => {
        describe('with good attributes', () => {
            it('should return the note', () => {
                return dao.create(NoteSupport.goodAttributes).then(note => {
                    expect(note.get()).toEqual(jasmine.objectContaining(NoteSupport.goodAttributes as any));
                });
            });

            it('should create the note', () => {
                return dao.create(NoteSupport.goodAttributes).then(() => {
                    return db.note.findById(1, { rejectOnEmpty: true }).then(note => {
                        expect(note).toEqual(jasmine.objectContaining(NoteSupport.goodAttributes as any));
                    });
                });
            });
        });

        describe('with bad attributes', () => {
            it('should get rejected', () => {
                return dao.create(NoteSupport.badAttributes).then(() => {
                    throw new Error('should reject');
                }).catch(() => {});
            });
        });
    });

    describe('calling the update method', () => {
        beforeEach(() => NoteSupport.create());

        describe('with a good id', () => {
            describe('and good attributes', () => {
                it('should return the note', () => {
                    return dao.update(1, NoteSupport.goodUpdateAttributes).then(note => {
                        expect(note).toEqual(jasmine.objectContaining(NoteSupport.goodUpdateAttributes as any));
                    });
                });

                it('should update the note', () => {
                    return dao.update(1, NoteSupport.goodUpdateAttributes).then(() => {
                        return db.note.findById(1).then(note => {
                            expect(note).toEqual(jasmine.objectContaining(NoteSupport.goodUpdateAttributes as any));
                        });
                    });
                });
            });

            describe('and bad attributes', () => {
                it('should get rejected', () => {
                    return dao.update(1, NoteSupport.badAttributes).then(() => {
                        throw new Error('should reject')
                    }).catch(() => {});
                });

                it('should not update the note', () => {
                    return dao.update(1, NoteSupport.badAttributes).catch(() => {
                        return db.note.findById(1).then(note => {
                            expect(note).toEqual(jasmine.objectContaining(NoteSupport.goodAttributes as any));
                        });
                    });
                });
            });
        });

        describe('with a bad id', () => {
            it('should get rejected', () => {
                return dao.update(2, NoteSupport.goodAttributes).then(() => {
                    throw new Error('should reject');
                }).catch(() => {});
            });
        });
    });

    describe('calling the delete method', () => {
        beforeEach(() => NoteSupport.create());

        describe('with a good id', () => {
            it('should delete the note', () => {
                return dao.delete(1).then(() => {
                    return db.note.findById(1).then(note => {
                        expect(note).toBe(null);
                    });
                });
            });
        });

        describe('with a bad id', () => {
            it('should get rejected', () => {
                return dao.delete(2).then(() => {
                    throw new Error('should reject');
                }).catch(() => {});
            });
        });
    });
})