import mongoose, { Connection, Model } from "mongoose";
import * as process from "node:process";
import {logger} from "../utils/logger";

export class MongoConnection {
    private static instance: MongoConnection;
    private connection: Connection | null = null;
    private DB_DEFAULT_TIMEOUT = 5000;

    private constructor() {}

    public static getInstance(): MongoConnection {
        if (!MongoConnection.instance) {
            MongoConnection.instance = new MongoConnection();
        }
        return MongoConnection.instance;
    }

    public async connect(uri: string) : Promise<void> {
        if(this.connection) return;

        const dbConnection = await mongoose.connect(uri, {
            autoIndex: true,
            serverSelectionTimeoutMS: Number(process.env.DB_TIMEOUT_MS ?? this.DB_DEFAULT_TIMEOUT),
        });

        this.connection = dbConnection.connection
        this.isConnected() && logger.info('New connection to mongodb');
    }

    public async disconnect(): Promise<void> {
        if (!this.connection) return;

        await mongoose.disconnect();
        !this.isConnected() && logger.info('Mongodb connection disconnected');
        this.connection = null;
    }

    public isConnected(): boolean {
        return this.connection?.readyState === 1;
    }
}