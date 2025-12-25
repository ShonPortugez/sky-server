import 'reflect-metadata';
import { useContainer, useExpressServer, IocAdapter } from 'routing-controllers';
import compression from 'compression'
import 'dotenv/config';
import * as process from "node:process";
import express from 'express';
import bodyParser from 'body-parser';
import { logger } from "./utils/logger";
import { DEFAULT_PORT } from "./utils/constants";
import { configureMongoDb } from "./utils/helpers/mongoConfigurator";
import { AuthController } from "./controllers/auth.controller";
import cookieParser from 'cookie-parser';
import { UserController } from "./controllers/user.controller";
import { container } from 'tsyringe';

useContainer({
    get: (classConstructor) => container.resolve(classConstructor)
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cookieParser());

useExpressServer(app, {
    cors: {
        credentials: true,
        origin: true
    },
    defaultErrorHandler: true,
    routePrefix: '/api',
    controllers: [AuthController, UserController],
});

configureMongoDb();

const port = process.env.PORT || DEFAULT_PORT;
app.listen(process.env.PORT, () => {
    logger.info(`Server listening on ${port}`);
})