import {createLogger, format, transports} from "winston";
import * as process from "node:process";
import {LOG_LEVEL_DEFAULT} from "./constants";

export const logger = createLogger({
    level: process.env.LOG_LEVEL || LOG_LEVEL_DEFAULT,
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.Console(),
    ],
})