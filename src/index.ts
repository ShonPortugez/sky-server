import express from 'express'
import cors from 'cors'
import http from 'http'
import compression from 'compression'
import * as bodyParser from "body-parser";
import 'dotenv/config';
import * as process from "node:process";
import {dbAvailabilityMiddleware} from "./middleware/dbAvailabilityMiddleware";
import {logger} from "./utils/logger";
import {DEFAULT_PORT} from "./utils/constants";
import {configureMongoDb} from "./utils/helpers/mongoConfigurator";

const app = express()

app.use(cors({
    credentials: true,
}))

configureMongoDb();
app.use(compression());
app.use(bodyParser.json());
app.use(dbAvailabilityMiddleware)

const server = http.createServer(app);

const port = process.env.PORT || DEFAULT_PORT;
server.listen(process.env.PORT, () => {
    logger.info(`Server listening on ${port}`);
})