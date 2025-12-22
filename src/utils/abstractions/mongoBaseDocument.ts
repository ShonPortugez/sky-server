import {Document, Types} from "mongoose";

export interface BaseDocument extends Document {
    id: Types.ObjectId;
    createdAt: Date;
}

export const baseSchemaOptions = {
    timestamps: true,
}