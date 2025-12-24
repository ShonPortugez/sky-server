import 'reflect-metadata';

import {container} from "tsyringe";
import { useContainer, createExpressServer } from 'routing-controllers';
import compression from 'compression'
import 'dotenv/config';
import * as process from "node:process";
import {DbAvailabilityMiddleware} from "./middleware/dbAvailabilityMiddleware";
import {logger} from "./utils/logger";
import {DEFAULT_PORT} from "./utils/constants";
import {configureMongoDb} from "./utils/helpers/mongoConfigurator";
import {AuthController} from "./controllers/auth.controller";
import {AuthMiddleware} from "./middleware/auth.middleware";

useContainer({
    get: (someClass) => container.resolve(someClass)
});

const app = createExpressServer({
    cors: {
        credentials: true,
        origin: true
    },
    defaultErrorHandler: true,
    routePrefix: '/api',
    controllers: [AuthController],
    middlewares: [AuthMiddleware, DbAvailabilityMiddleware]
})

configureMongoDb();
app.use(compression());

const port = process.env.PORT || DEFAULT_PORT;
app.listen(process.env.PORT, () => {
    logger.info(`Server listening on ${port}`);
})