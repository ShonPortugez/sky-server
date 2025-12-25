import { Schema, model } from 'mongoose';
import {baseSchemaOptions} from "../utils/abstractions/mongoBaseDocument";
import {User} from "./user.types";
import {DB_USERS_COLLECTION} from "../utils/constants";

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