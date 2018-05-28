import * as Sequelize from 'sequelize';

import { Instance, RawInstance } from '../model';
import { DAOModel } from './index';
import { UserDAO } from '../dao/user';
import { DbConnection } from '../dbConnection';

/* yeo: imports */
import { NoteAttributes, NoteInstance } from './note';

import { ContainerAttributes, ContainerInstance } from './container';


/* The attributes of the model. Does not include id. */
export interface UserAttributes {
    /**
     * Do not edit the attributes between yeo-replace. They will be added by automation.
     */

    /* yeo-replace: attributes */
    username: string;
    password: string;
    email: string;
    secret ? : string;
    salt ? : string;
    /* yeo-end */
}

/* This should include things an instance of the model will have, but without
 * using sequelize methods. For instance, if an instance of your model has an array
 * of another model instance, you wouldn't do `OtherModelInstance[]`, you'd do
 * `OtherModelRawInstance[]`. This is because TSOA is unable to correctly type the
 * sequelize methods that are attached to an instance.
 */
export interface RawUserInstance extends UserAttributes, RawInstance {

}

/* This is where you'll include the real sequelize instance stuff. */
export interface UserInstance extends Sequelize.Instance < UserAttributes > , RawUserInstance {
    /* yeo: instance */
    addNote: Sequelize.HasManyAddAssociationMixin < NoteInstance,
    number > ;
    addNotes: Sequelize.HasManyAddAssociationsMixin < NoteInstance,
    number > ;
    countNotes: Sequelize.HasManyCountAssociationsMixin;
    createNote: Sequelize.HasManyCreateAssociationMixin < NoteAttributes,
    NoteInstance > ;
    getNotes: Sequelize.HasManyGetAssociationsMixin < NoteInstance > ;
    hasNote: Sequelize.HasManyHasAssociationMixin < NoteInstance,
    number > ;
    hasNotes: Sequelize.HasManyHasAssociationsMixin < NoteInstance,
    number > ;
    removeNote: Sequelize.HasManyRemoveAssociationMixin < NoteInstance,
    number > ;
    removeNotes: Sequelize.HasManyRemoveAssociationsMixin < NoteInstance,
    number > ;
    setNotes: Sequelize.HasManySetAssociationsMixin < NoteInstance,
    number > ;

    addContainer: Sequelize.HasManyAddAssociationMixin < ContainerInstance,
    number > ;
    addContainers: Sequelize.HasManyAddAssociationsMixin < ContainerInstance,
    number > ;
    countContainers: Sequelize.HasManyCountAssociationsMixin;
    createContainer: Sequelize.HasManyCreateAssociationMixin < ContainerAttributes,
    ContainerInstance > ;
    getContainers: Sequelize.HasManyGetAssociationsMixin < ContainerInstance > ;
    hasContainer: Sequelize.HasManyHasAssociationMixin < ContainerInstance,
    number > ;
    hasContainers: Sequelize.HasManyHasAssociationsMixin < ContainerInstance,
    number > ;
    removeContainer: Sequelize.HasManyRemoveAssociationMixin < ContainerInstance,
    number > ;
    removeContainers: Sequelize.HasManyRemoveAssociationsMixin < ContainerInstance,
    number > ;
    setContainers: Sequelize.HasManySetAssociationsMixin < ContainerInstance,
    number > ;

};

/* This type will be added to DbConnection for you. You should be able to access
 * this model using something like:
 * 
 * ```javascript
 * import db from '../models';
 * 
 * db.User.create(...);
 * db.User.DAO.yourMethod(...);
 * etc.
 * ```
 */
type TDAO = UserDAO < UserInstance, UserAttributes > ;
export type TUserModel = DAOModel < UserInstance, UserAttributes, TDAO > ;


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
    const User: TUserModel = sequelize.define('user', Object.assign < Sequelize.DefineAttributes, Sequelize.DefineAttributes > ({
        /* Do not change anything in here. Automation will fill this out for you, anything that
         * needs to be overwritten should be added to the next object being assigned to this object
         */

        /* yeo-replace: definitions */
        username: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        secret: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        }

        /* yeo-end */
    }, {
        /* Overwrite model attributes here */
    }));

    User.postCreate = function(db: DbConnection, model: TUserModel) {
        model.DAO = new UserDAO();

        /* Add your associations here */

        /* yeo: associations */
        model.hasMany(db.note, {
            foreignKey: 'ownerId'
        });

        model.hasMany(db.container, {
            foreignKey: 'ownerId'
        });

        return model;
    }

    return User;
}