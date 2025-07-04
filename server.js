import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import expressWinston from 'express-winston';

import indexRoutes from './src/routes/indexRoutes.js';
import otherRoutes from "./src/routes/otherRoutes.js";
import inviteRoutes from "./src/routes/inviteRoutes.js";
import aboutRoutes from "./src/routes/aboutRoutes.js";
import checkAllCodesUsed from "./src/middleware/remainingCodesMiddleware.js";

import Logger from './src/service/Logger.js';

dotenv.config();

const server = express();
server.set('trust proxy', true);

server.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            'script-src': ["'self'", "'unsafe-inline'"],
        }
    },
}));
server.use(express.json());
server.use(expressWinston.logger({
    winstonInstance: Logger,
    meta: true,
    msg: '{{req.ip}} - {{req.method}} {{req.url}} {{res.statusCode}} - {{res.responseTime}}ms',
    colorize: true,
}));

server.set('view engine', 'ejs');
server.set('views', 'views');

server.use(express.static('public'));
server.use(checkAllCodesUsed);

server.use('/', indexRoutes);
server.use('/invite', inviteRoutes);
server.use('/about', aboutRoutes);
server.use('/', otherRoutes);

const serverPort = process.env.SERVER_PORT || 3000;

server.listen(serverPort, () => {
    console.log('Listening on port ' + serverPort);
});
