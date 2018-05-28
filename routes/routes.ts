/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { ContainerController } from './../controllers/container';
import { NoteController } from './../controllers/note';
import { UserController } from './../controllers/user';
import { expressAuthentication } from './../authentication/index';

const models: TsoaRoute.Models = {
    "PromiseLikeRawContainerInstance[]": {
    },
    "PromiseLikeobject": {
    },
    "PromiseLikeRawContainerInstance": {
    },
    "ContainerAttributes": {
        "properties": {
            "parent": { "dataType": "double" },
            "ownerId": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
        },
    },
    "PromiseLikevoid": {
    },
    "PromiseLikeRawNoteInstance[]": {
    },
    "PromiseLikeRawNoteInstance": {
    },
    "NoteAttributes": {
        "properties": {
            "containerId": { "dataType": "double", "required": true },
            "title": { "dataType": "string", "required": true },
            "contents": { "dataType": "string", "required": true },
        },
    },
    "PromiseLikeRawUserInstance[]": {
    },
    "PromiseLikeRawUserInstance": {
    },
    "UserAttributes": {
        "properties": {
            "username": { "dataType": "string", "required": true },
            "passhash": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
        },
    },
};

export function RegisterRoutes(app: any) {
    app.get('/containers',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ContainerController();


            const promise = controller.getContainers.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/containers/:container_id',
        function(request: any, response: any, next: any) {
            const args = {
                container_id: { "in": "path", "name": "container_id", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ContainerController();


            const promise = controller.getContainer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/containers',
        function(request: any, response: any, next: any) {
            const args = {
                attributes: { "in": "body", "name": "attributes", "required": true, "ref": "ContainerAttributes" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ContainerController();


            const promise = controller.createContainer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.patch('/containers/:container_id',
        function(request: any, response: any, next: any) {
            const args = {
                container_id: { "in": "path", "name": "container_id", "required": true, "dataType": "double" },
                attributes: { "in": "body", "name": "attributes", "required": true, "ref": "ContainerAttributes" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ContainerController();


            const promise = controller.updateContainer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/containers/:container_id',
        function(request: any, response: any, next: any) {
            const args = {
                container_id: { "in": "path", "name": "container_id", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new ContainerController();


            const promise = controller.deleteContainer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/notes',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NoteController();


            const promise = controller.getNotes.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/notes/:note_id',
        function(request: any, response: any, next: any) {
            const args = {
                note_id: { "in": "path", "name": "note_id", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NoteController();


            const promise = controller.getNote.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/notes',
        function(request: any, response: any, next: any) {
            const args = {
                attributes: { "in": "body", "name": "attributes", "required": true, "ref": "NoteAttributes" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NoteController();


            const promise = controller.createNote.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.patch('/notes/:note_id',
        function(request: any, response: any, next: any) {
            const args = {
                note_id: { "in": "path", "name": "note_id", "required": true, "dataType": "double" },
                attributes: { "in": "body", "name": "attributes", "required": true, "ref": "NoteAttributes" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NoteController();


            const promise = controller.updateNote.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/notes/:note_id',
        function(request: any, response: any, next: any) {
            const args = {
                note_id: { "in": "path", "name": "note_id", "required": true, "dataType": "double" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new NoteController();


            const promise = controller.deleteNote.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/users',
        function(request: any, response: any, next: any) {
            const args = {
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.getUsers.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/users/:user_id',
        function(request: any, response: any, next: any) {
            const args = {
                user_id: { "in": "path", "name": "user_id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.getUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/users',
        function(request: any, response: any, next: any) {
            const args = {
                attributes: { "in": "body", "name": "attributes", "required": true, "ref": "UserAttributes" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.createUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.patch('/users/:user_id',
        function(request: any, response: any, next: any) {
            const args = {
                user_id: { "in": "path", "name": "user_id", "required": true, "dataType": "string" },
                attributes: { "in": "body", "name": "attributes", "required": true, "ref": "UserAttributes" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.updateUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/users/:user_id',
        function(request: any, response: any, next: any) {
            const args = {
                user_id: { "in": "path", "name": "user_id", "required": true, "dataType": "string" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.deleteUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });


    function promiseHandler(controllerObj: any, promise: any, response: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode;
                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.set(name, headers[name]);
                    });

                    statusCode = controller.getStatus();
                }

                if (data) {
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch((error: any) => next(error));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const fieldErrors: FieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, fieldErrors);
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, fieldErrors);
                case 'header':
                    return ValidateParam(args[key], request.header(name), models, name, fieldErrors);
                case 'body':
                    return ValidateParam(args[key], request.body, models, name, fieldErrors, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.body[name], models, name, fieldErrors, 'body.');
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }
}
