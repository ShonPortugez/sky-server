import {Document, Types} from "mongoose";

export interface BaseDocument extends Document {
    id: string;
    createdAt: Date;
}

export const baseSchemaOptions = {
    timestamps: true,
}