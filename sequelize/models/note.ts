import * as Sequelize from 'sequelize';

import { RawInstance } from '../model';
import { DAOModel } from './index';
import { NoteDAO } from '../dao/note';
import { DbConnection } from '../dbConnection';

/* yeo: imports */
import { UserAttributes, UserInstance } from './user';


/* The attributes of the model. Does not include id. */
export interface NoteAttributes {
    /**
     * Do not edit the attributes between yeo-replace. They will be added by automation.
     */

    /* yeo-replace: attributes */
    containerId: number;
    title: string;
    contents?: string;
    ownerId: string;

    /* yeo-end */
}

/* This should include things an instance of the model will have, but without
 * using sequelize methods. For instance, if an instance of your model has an array
 * of another model instance, you wouldn't do `OtherModelInstance[]`, you'd do
 * `OtherModelRawInstance[]`. This is because TSOA is unable to correctly type the
 * sequelize methods that are attached to an instance.
 */
export interface RawNoteInstance extends NoteAttributes, RawInstance {

}

/* This is where you'll include the real sequelize instance stuff. */
export interface NoteInstance extends Sequelize.Instance < NoteAttributes > , RawNoteInstance {
    /* yeo: instance */
    createUser: Sequelize.BelongsToCreateAssociationMixin < UserAttributes > ;
    getUser: Sequelize.BelongsToGetAssociationMixin < UserInstance > ;

};

/* This type will be added to DbConnection for you. You should be able to access
 * this model using something like:
 * 
 * ```javascript
 * import db from '../models';
 * 
 * db.Note.create(...);
 * db.Note.DAO.yourMethod(...);
 * etc.
 * ```
 */
export type TDAO = NoteDAO < NoteInstance, NoteAttributes > ;
export type TNoteModel = DAOModel < NoteInstance, NoteAttributes, TDAO > ;


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
    const Note = sequelize.define('note', Object.assign < Sequelize.DefineAttributes, Sequelize.DefineAttributes > ({
        /* Do not change anything in here. Automation will fill this out for you, anything that
         * needs to be overwritten should be added to the next object being assigned to this object
         */

        /* yeo-replace: definitions */
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
            type: Sequelize.STRING
        },

        /* yeo-end */
    }, {
        /* Overwrite model attributes here */
    }));

    (Note as TNoteModel).postCreate = function(db: DbConnection, model: TNoteModel) {
        model.DAO = new NoteDAO();

        /* Add your associations here */

        /* yeo-replace: associationComments */
        /* Relates to `containers`.`parent` */

        /* yeo-end */

        /* yeo: associations */
        model.belongsTo(db.user, {
            foreignKey: 'ownerId',
            targetKey: 'username'
        });

        model.belongsTo(db.container, {
            foreignKey: 'containerId',
            targetKey: 'id'
        });

        return model;
    }

    return Note;
}