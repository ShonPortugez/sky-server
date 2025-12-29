import { Schema, model } from 'mongoose';
import {baseSchemaOptions} from "../database/mongoBaseDocument";
import {User} from "./user.types";
import * as process from "node:process";
import 'dotenv/config';

const DB_USERS_COLLECTION = process.env.DB_USERS_COLLECTION ?? 'users';

const UserSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, {
    ...baseSchemaOptions,
    collection: DB_USERS_COLLECTION
});

export const UserModel = model<User>('User', UserSchema);