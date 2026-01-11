import {createLogger, format, transports} from "winston";
import 'dotenv/config';
import * as process from "node:process";

const LOG_LEVEL_DEFAULT = 'info'

export const logger = createLogger({
    level: process.env.LOG_LEVEL || LOG_LEVEL_DEFAULT,
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.Console(),
    ],
})