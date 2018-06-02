import * as http from "http";  
import * as express from "express";  
import * as bodyParser from "body-parser";  
import Debug from 'debug';

let swaggerUI = require('swagger-ui-express');

let debug = Debug('mdjotter:http');

import { RegisterRoutes } from "./routes/routes";  

import './index';

// Define the app
const port = process.env.PORT ? process.env.PORT : 3000;
const app: express.Application = express();  

// General use includes
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(bodyParser.json());  

// Register tsoa routes
RegisterRoutes(app);

// Serve up Swagger UI
const swaggerJSON = require('./swagger/swagger.json');  
app.use('/swagger.json', express.static(__dirname + '/swagger/swagger.json'));
app.use('/docs', swaggerUI.serve); 
app.get('/docs', swaggerUI.setup(swaggerJSON)); 

// Handle 404's
app.use('*', (req, res, next) => {
    res.sendStatus(404);
})

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log('Error:', err);
});

// Start the server
const server = http.createServer(app);  
server.listen(port);

// Handle server events
server.on('listening', () => {
    let address = server.address();

    let port = typeof address === 'string' ? address : address.port;
    debug('Listening on port ' + port);
});

export default app;  