/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { UserController } from './../controllers/user';
import { expressAuthentication } from './../authentication/index';

const models: TsoaRoute.Models = {
    "RawUserInstance": {
        "properties": {
            "username": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "secret": { "dataType": "string" },
            "salt": { "dataType": "string" },
            "id": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
        },
    },
    "ICreateUserBody": {
        "properties": {
            "username": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
        },
    },
    "PromiseLikeobject": {
    },
    "UserAttributes": {
        "properties": {
            "username": { "dataType": "string", "required": true },
            "password": { "dataType": "string", "required": true },
            "email": { "dataType": "string", "required": true },
            "secret": { "dataType": "string" },
            "salt": { "dataType": "string" },
        },
    },
    "PromiseLikevoid": {
    },
    "ILoginBody": {
        "properties": {
            "password": { "dataType": "string", "required": true },
        },
    },
    "RawContainerInstance": {
        "properties": {
            "parentId": { "dataType": "double" },
            "ownerId": { "dataType": "string", "required": true },
            "name": { "dataType": "string", "required": true },
            "id": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
        },
    },
    "ICreateContainerParams": {
        "properties": {
            "parentId": { "dataType": "double" },
            "name": { "dataType": "string", "required": true },
        },
    },
    "PartialICreateContainerParams": {
    },
    "RawNoteInstance": {
        "properties": {
            "containerId": { "dataType": "double", "required": true },
            "title": { "dataType": "string", "required": true },
            "contents": { "dataType": "string" },
            "ownerId": { "dataType": "string", "required": true },
            "id": { "dataType": "double", "required": true },
            "createdAt": { "dataType": "datetime", "required": true },
            "updatedAt": { "dataType": "datetime", "required": true },
        },
    },
    "IRawContainerChildren": {
        "properties": {
            "containers": { "dataType": "array", "array": { "ref": "RawContainerInstance" }, "required": true },
            "notes": { "dataType": "array", "array": { "ref": "RawNoteInstance" }, "required": true },
        },
    },
    "PromiseLikeRawNoteInstance": {
    },
    "ICreateNoteParams": {
        "properties": {
            "title": { "dataType": "string", "required": true },
            "contents": { "dataType": "string" },
            "containerId": { "dataType": "double", "required": true },
        },
    },
    "PartialICreateNoteParams": {
    },
    "ISearchBody": {
        "properties": {
            "query": { "dataType": "string", "required": true },
        },
    },
};

export function RegisterRoutes(app: any) {
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
                attributes: { "in": "body", "name": "attributes", "required": true, "ref": "ICreateUserBody" },
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
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
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
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
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
    app.get('/users/:user_id/containers',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
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


            const promise = controller.getContainers.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/users/:user_id/login',
        function(request: any, response: any, next: any) {
            const args = {
                user_id: { "in": "path", "name": "user_id", "required": true, "dataType": "string" },
                body: { "in": "body", "name": "body", "required": true, "ref": "ILoginBody" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.login.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/users/:user_id/containers/:container_id',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
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

            const controller = new UserController();


            const promise = controller.getContainer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/users/:user_id/containers',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
        function(request: any, response: any, next: any) {
            const args = {
                user_id: { "in": "path", "name": "user_id", "required": true, "dataType": "string" },
                params: { "in": "body", "name": "params", "required": true, "ref": "ICreateContainerParams" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.createContainer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.patch('/users/:user_id/containers/:container_id',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
        function(request: any, response: any, next: any) {
            const args = {
                container_id: { "in": "path", "name": "container_id", "required": true, "dataType": "double" },
                params: { "in": "body", "name": "params", "required": true, "ref": "PartialICreateContainerParams" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.updateContainer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/users/:user_id/containers/:container_id',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
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

            const controller = new UserController();


            const promise = controller.deleteContainer.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/users/:user_id/containers/:container_id/children',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
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

            const controller = new UserController();


            const promise = controller.getChildren.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/users/:user_id/notes',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
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


            const promise = controller.getNotes.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.get('/users/:user_id/notes/:note_id',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
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

            const controller = new UserController();


            const promise = controller.getNote.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/users/:user_id/notes',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
        function(request: any, response: any, next: any) {
            const args = {
                user_id: { "in": "path", "name": "user_id", "required": true, "dataType": "string" },
                params: { "in": "body", "name": "params", "required": true, "ref": "ICreateNoteParams" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.createNote.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.patch('/users/:user_id/notes/:note_id',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
        function(request: any, response: any, next: any) {
            const args = {
                note_id: { "in": "path", "name": "note_id", "required": true, "dataType": "double" },
                attributes: { "in": "body", "name": "attributes", "required": true, "ref": "PartialICreateNoteParams" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.updateNote.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.delete('/users/:user_id/notes/:note_id',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
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

            const controller = new UserController();


            const promise = controller.deleteNote.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });
    app.post('/users/:user_id/notes/search',
        authenticateMiddleware([{ "name": "owner", "scopes": ["user"] }]),
        function(request: any, response: any, next: any) {
            const args = {
                user_id: { "in": "path", "name": "user_id", "required": true, "dataType": "string" },
                params: { "in": "body", "name": "params", "required": true, "ref": "ISearchBody" },
            };

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request);
            } catch (err) {
                return next(err);
            }

            const controller = new UserController();


            const promise = controller.searchNotes.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, next);
        });

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return (request: any, response: any, next: any) => {
            let responded = 0;
            let success = false;
            for (const secMethod of security) {
                expressAuthentication(request, secMethod.name, secMethod.scopes).then((user: any) => {
                    // only need to respond once
                    if (!success) {
                        success = true;
                        responded++;
                        request['user'] = user;
                        next();
                    }
                })
                    .catch((error: any) => {
                        responded++;
                        if (responded == security.length && !success) {
                            response.status(401);
                            next(error)
                        }
                    })
            }
        }
    }

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
