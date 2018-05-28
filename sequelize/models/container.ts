import * as Sequelize from 'sequelize';

import { Instance, RawInstance } from '../model';
import { DAOModel } from './index';
import { ContainerDAO } from '../dao/container';
import { DbConnection } from '../dbConnection';

/* yeo: imports */

/* The attributes of the model. Does not include id. */
export interface ContainerAttributes {
    /**
     * Do not edit the attributes between yeo-replace. They will be added by automation.
     */

    /* yeo-replace: attributes */
    parent?: number;
    ownerId: string;
    name: string;

    /* yeo-end */
}

/* This should include things an instance of the model will have, but without
 * using sequelize methods. For instance, if an instance of your model has an array
 * of another model instance, you wouldn't do `OtherModelInstance[]`, you'd do
 * `OtherModelRawInstance[]`. This is because TSOA is unable to correctly type the
 * sequelize methods that are attached to an instance.
 */
export interface RawContainerInstance extends ContainerAttributes, RawInstance {

}

/* This is where you'll include the real sequelize instance stuff. */
export interface ContainerInstance extends Sequelize.Instance < ContainerAttributes > , RawContainerInstance {
    /* yeo: instance */
};

/* This type will be added to DbConnection for you. You should be able to access
 * this model using something like:
 * 
 * ```javascript
 * import db from '../models';
 * 
 * db.Container.create(...);
 * db.Container.DAO.yourMethod(...);
 * etc.
 * ```
 */
type TDAO = ContainerDAO < ContainerInstance, ContainerAttributes > ;
export type TContainerModel = DAOModel < ContainerInstance, ContainerAttributes, TDAO > ;


/**
 * This method will be called when the app is being initialized automatcially for
 * you. The first thing you'll do in here is define what you want your model to
 * look like. See http://docs.sequelizejs.com/manual/tutorial/models-definition.html
 * for more information there.
 * 
 * The second thing you'll do in the `postCreate` method is define anything that
 * needs to happen once all models are created. This will be things like adding
 * the DAO to the model, adding associations, etc.
 * 
 * @param sequelize The sequelize instance
 * @param DataTypes The DataTypes
 */
export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes) {
    const Container: TContainerModel = sequelize.define('container', Object.assign < Sequelize.DefineAttributes, Sequelize.DefineAttributes > ({
        /* Do not change anything in here. Automation will fill this out for you, anything that
         * needs to be overwritten should be added to the next object being assigned to this object
         */

        /* yeo-replace: definitions */
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

        /* yeo-end */
    }, {
        /* Overwrite model attributes here */
    }));

    Container.postCreate = function(db: DbConnection, model: TContainerModel) {
        model.DAO = new ContainerDAO();

        /* Add your associations here */

        /* yeo-replace: associationComments */
        /* Relates to `containers`.`id` */
        /* Relates to `users`.`username` */

        /* yeo-end */

        model.belongsTo(db.user, {
            foreignKey: 'ownerId'
        });
        model.belongsTo(db.container, {
            foreignKey: 'parentId'
        });
        model.hasMany(db.container);

        /* yeo: associations */

        return model;
    }

    return Container;
}