import { Request, Response, NextFunction } from 'express';
import { responseEnhancer } from "express-response-formatter";
import {MongoConnection} from "../database/mongoConnection";

export function dbAvailabilityMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const db = MongoConnection.getInstance();
    if (db.isConnected()) {
        res.formatter.serviceUnavailable({ message: 'Service is unreachable' });
        return;
    }

    next();
}
