import db from '../sequelize/models';
import Controller from '../controller';
import { NOT_FOUND } from '../lib/errors';

/* yeo: imports */
import { RawNoteInstance, NoteAttributes } from '../sequelize/models/note';

import { Get, Put, Post, Delete, Patch, Security, Tags, Route, Response, Body, SuccessResponse } from 'tsoa';

@Route('notes')
@Tags('Notes')
export class NoteController extends Controller {
    /**
     * Controller methods go here. See TSOA documentation for details.
     */

    /* yeo: subroutes */
    /**
     * Get all notes
     */
    @Get()

    getNotes(): PromiseLike < RawNoteInstance[] > {
        return db.note.DAO.getAll();
    }

    /**
     * Get a single note
     * 
     * @param note_id The id of the note
     */
    @Get('{note_id}')
    @Response(404)

    getNote(note_id: number): PromiseLike < RawNoteInstance | void > {
        return db.note.DAO.get(note_id).catch(err => {
            if (err === NOT_FOUND) this.setStatus(404);
        });
    }

    /**
     * Create a new note
     * 
     * @param attributes The attributes to create the note with
     */
    @Post()
    @Response(201)
    @Response(400)

    createNote(@Body() attributes: NoteAttributes): PromiseLike < RawNoteInstance > {
        return db.note.DAO.create(attributes).then(note => {
            this.setStatus(201);
            return note;
        });
    }

    /**
     * Update an existing note
     * 
     * @param note_id The id of the note
     * @param attributes The attributes to update the note with
     */
    @Patch('{note_id}')
    @Response(404)
    @Response(400)

    updateNote(note_id: number, @Body() attributes: NoteAttributes): PromiseLike < RawNoteInstance | void > {
        return db.note.DAO.update(note_id, attributes).catch(err => {
            if (err === NOT_FOUND) this.setStatus(404);
        });
    }

    /**
     * Delete an existing note
     * 
     * @param note_id The id of the note
     */
    @Delete('{note_id}')
    @Response(404)
    @Response(204)

    deleteNote(note_id: number): PromiseLike < void > {
        return db.note.DAO.delete(note_id).then(() => {
            this.setStatus(204);
        }).catch(err => {
            if (err === NOT_FOUND) this.setStatus(404);
        });
    }
}