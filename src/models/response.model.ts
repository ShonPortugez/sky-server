import {baseSchemaOptions} from "../utils/abstractions/mongoBaseDocument";
import {Schema} from "mongoose";

const responseSchemaOptions = {
    ...baseSchemaOptions,
    _id: true
};

export const SliderResponseSchema = new Schema({ value: { type: Number, required: true } }, responseSchemaOptions);
export const RateResponseSchema = new Schema({ value: { type: Number, required: true } }, responseSchemaOptions);
export const TextResponseSchema = new Schema({ value: { type: String, required: true } }, responseSchemaOptions);
export const MultiAnswerResponseSchema = new Schema({ value: { type: [Number], required: true } }, responseSchemaOptions);
export const DateResponseSchema = new Schema({ value: { type: Date, required: true } }, responseSchemaOptions);
export const CheckboxResponseSchema = new Schema({ value: { type: Boolean, required: true } }, responseSchemaOptions);