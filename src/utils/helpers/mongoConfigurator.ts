import 'dotenv/config';
import {MongoConnection} from "../../database/mongoConnection";
import {logger} from "../logger";
import * as process from "node:process";

export function configureMongoDb(): void {
    MongoConnection.getInstance()
        .connect(process.env.DATABASE_URI ?? '')
        .catch(err => {
            logger.warn(
                'Initial MongoDB connection failed',
                { err }
            );
        });
}