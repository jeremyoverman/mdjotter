import * as Sequelize from 'sequelize';

/**
 * Import the models here. Do not delete any of the comments beginning with yeo.
 * These are here to help the yeoman generator know where to stick the template
 * pieces.
 * 
 * import { TMyModel } from './models/myModel.ts';
 */

/* yeo: import */
import { TNoteModel } from './models/note';
import { TContainerModel } from './models/container';
import { TUserModel } from './models/user';

/**
 * Add the model here
 * 
 * myModel: TMyModel
 */
export interface DbConnection {
    /* yeo: type */
    note: TNoteModel;
    container: TContainerModel;
    user: TUserModel;
    sequelize: Sequelize.Sequelize;
}