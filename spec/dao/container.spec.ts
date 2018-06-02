import db from '../../sequelize/models/index';
import * as setup from '../support/setup';

import * as ContainerSupport from '../support/model/container';

let dao = db.container.DAO;

describe('In the Container DAO', () => {
    setup.sequelize();

    /* yeo: specs */
    describe('calling the getAll method', () => {
        beforeEach(() => ContainerSupport.create(2));

        it('should return an array of containers', () => {
            return dao.getAll().then(containers => {
                expect(containers.length).toBe(2);
            });
        });
    });

    describe('calling the get method', () => {
        beforeEach(() => ContainerSupport.create());

        describe('with a good id', () => {
            it('should return the container', () => {
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
            it('should return the container', () => {
                return dao.create(ContainerSupport.goodAttributes).then(container => {
                    expect(container).toEqual(jasmine.objectContaining(ContainerSupport.goodAttributes as any));
                });
            });

            it('should create the container', () => {
                return dao.create(ContainerSupport.goodAttributes).then(() => {
                    return db.container.findById(1, { rejectOnEmpty: true }).then(container => {
                        expect(container).toEqual(jasmine.objectContaining(ContainerSupport.goodAttributes as any));
                    });
                });
            });
        });

        describe('with bad attributes', () => {
            it('should get rejected', () => {
                return dao.create(ContainerSupport.badAttributes).then(() => {
                    throw new Error('should reject');
                }).catch(() => {});
            });
        });
    });

    describe('calling the update method', () => {
        beforeEach(() => ContainerSupport.create());

        describe('with a good id', () => {
            describe('and good attributes', () => {
                it('should return the container', () => {
                    return dao.update(1, ContainerSupport.goodUpdateAttributes).then(container => {
                        expect(container).toEqual(jasmine.objectContaining(ContainerSupport.goodUpdateAttributes as any));
                    });
                });

                it('should update the container', () => {
                    return dao.update(1, ContainerSupport.goodUpdateAttributes).then(() => {
                        return db.container.findById(1).then(container => {
                            expect(container).toEqual(jasmine.objectContaining(ContainerSupport.goodUpdateAttributes as any));
                        });
                    });
                });
            });

            describe('and bad attributes', () => {
                it('should get rejected', () => {
                    return dao.update(1, ContainerSupport.badAttributes).then(() => {
                        throw new Error('should reject')
                    }).catch(() => {});
                });

                it('should not update the container', () => {
                    return dao.update(1, ContainerSupport.badAttributes).catch(() => {
                        return db.container.findById(1).then(container => {
                            expect(container).toEqual(jasmine.objectContaining(ContainerSupport.goodAttributes as any));
                        });
                    });
                });
            });
        });

        describe('with a bad id', () => {
            it('should get rejected', () => {
                return dao.update(2, ContainerSupport.goodAttributes).then(() => {
                    throw new Error('should reject');
                }).catch(() => {});
            });
        });
    });

    describe('calling the delete method', () => {
        beforeEach(() => ContainerSupport.create());

        describe('with a good id', () => {
            it('should delete the container', () => {
                return dao.delete(1).then(() => {
                    return db.container.findById(1).then(container => {
                        expect(container).toBe(null);
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