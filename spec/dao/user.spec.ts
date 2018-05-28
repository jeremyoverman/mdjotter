import db from '../../sequelize/models/index';
import * as setup from '../support/setup';

import { UserInstance, UserAttributes } from '../../sequelize/models/user';

import * as UserSupport from '../support/model/user';

let dao = db.user.DAO;

describe('In the User DAO', () => {
    setup.sequelize();

    /* yeo: specs */
    describe('calling the getAll method', () => {
        beforeEach(() => UserSupport.create(2));

        it('should return an array of users', () => {
            return dao.getAll().then(users => {
                expect(users.length).toBe(2);
            });
        });
    });

    describe('calling the get method', () => {
        beforeEach(() => UserSupport.create());

        describe('with a good id', () => {
            it('should return the user', () => {
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
            it('should return the user', () => {
                return dao.create(UserSupport.goodAttributes).then(user => {
                    expect(user).toEqual(jasmine.objectContaining(UserSupport.goodAttributes));
                });
            });

            it('should create the user', () => {
                return dao.create(UserSupport.goodAttributes).then(() => {
                    return db.user.findById(1, { rejectOnEmpty: true }).then(user => {
                        expect(user).toEqual(jasmine.objectContaining(UserSupport.goodAttributes));
                    });
                });
            });
        });

        describe('with bad attributes', () => {
            it('should get rejected', () => {
                return dao.create(UserSupport.badAttributes).then(() => {
                    throw new Error('should reject');
                }).catch(() => {});
            });
        });
    });

    describe('calling the update method', () => {
        beforeEach(() => UserSupport.create());

        describe('with a good id', () => {
            describe('and good attributes', () => {
                it('should return the user', () => {
                    return dao.update(1, UserSupport.goodUpdateAttributes).then(user => {
                        expect(user).toEqual(jasmine.objectContaining(UserSupport.goodUpdateAttributes));
                    });
                });

                it('should update the user', () => {
                    return dao.update(1, UserSupport.goodUpdateAttributes).then(() => {
                        return db.user.findById(1).then(user => {
                            expect(user).toEqual(jasmine.objectContaining(UserSupport.goodUpdateAttributes));
                        });
                    });
                });
            });

            describe('and bad attributes', () => {
                it('should get rejected', () => {
                    return dao.update(1, UserSupport.badAttributes).then(() => {
                        throw new Error('should reject')
                    }).catch(() => {});
                });

                it('should not update the user', () => {
                    return dao.update(1, UserSupport.badAttributes).catch(() => {
                        return db.user.findById(1).then(user => {
                            expect(user).toEqual(jasmine.objectContaining(UserSupport.goodAttributes));
                        });
                    });
                });
            });
        });

        describe('with a bad id', () => {
            it('should get rejected', () => {
                return dao.update(2, UserSupport.goodAttributes).then(() => {
                    throw new Error('should reject');
                }).catch(() => {});
            });
        });
    });

    describe('calling the delete method', () => {
        beforeEach(() => UserSupport.create());

        describe('with a good id', () => {
            it('should delete the user', () => {
                return dao.delete(1).then(() => {
                    return db.user.findById(1).then(user => {
                        expect(user).toBe(null);
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