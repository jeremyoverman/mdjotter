import { QueryInterface, SequelizeStatic } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return Promise.resolve()
            .then(() => queryInterface.createTable('users', {
                username: {
                    type: Sequelize.STRING,
                    primaryKey: true,
                    allowNull: false,
                },
                passhash: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            }))
            .then(() => queryInterface.createTable('containers', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                parentId: {
                    type: Sequelize.INTEGER,
                },
                ownerId: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                name: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            }))
            .then(() => queryInterface.addConstraint('containers', ['parentId'], {
                type: 'foreign key',
                name: 'fk_containers_containers1',
                references: {
                    table: 'containers',
                    field: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }))
            .then(() => queryInterface.addConstraint('containers', ['ownerId'], {
                type: 'foreign key',
                name: 'fk_containers_users1',
                references: {
                    table: 'users',
                    field: 'username'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }))
            .then(() => queryInterface.createTable('notes', {
                id: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },
                containerId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                title: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                contents: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE
                }
            }))
            .then(() => queryInterface.addConstraint('notes', ['containerId'], {
                type: 'foreign key',
                name: 'fk_notes_containers1',
                references: {
                    table: 'containers',
                    field: 'id'
                },
                onDelete: 'cascade',
                onUpdate: 'cascade'
            }))
            .catch(err => {
                console.error(err)

                throw err;
            });

    },
    down: (queryInterface: QueryInterface, Sequelize: SequelizeStatic) => {
        return queryInterface.dropAllTables();
    }
};