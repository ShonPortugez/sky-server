import 'reflect-metadata';
import { useContainer, useExpressServer, IocAdapter } from 'routing-controllers';
import compression from 'compression'
import 'dotenv/config';
import * as process from "node:process";
import express from 'express';
import bodyParser from 'body-parser';
import { logger } from "./utils/logger";
import {DEFAULT_PORT, JWT_ALGORITHM} from "./constants";
import { configureMongoDb } from "./utils/helpers/mongoConfigurator";
import { AuthController } from "./controllers/auth.controller";
import cookieParser from 'cookie-parser';
import { UserController } from "./controllers/user.controller";
import { container } from 'tsyringe';
import {SurveyController} from "./controllers/survey.controller";
import {expressjwt} from "express-jwt";
import {Algorithm} from "jsonwebtoken";
import {JwtMiddleware} from "./middleware/auth.middleware";

useContainer({
    get: (classConstructor) => container.resolve(classConstructor)
});

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: [JWT_ALGORITHM as Algorithm],
    getToken: (req) => {
        return req.cookies?.access;
    }
}).unless({ path: ['/auth/login']}));

useExpressServer(app, {
    cors: {
        credentials: true,
        origin: true
    },
    defaultErrorHandler: true,
    controllers: [AuthController, UserController, SurveyController],
});

configureMongoDb();

const port = process.env.PORT || DEFAULT_PORT;
app.listen(process.env.PORT, () => {
    logger.info(`Server listening on ${port}`);
})