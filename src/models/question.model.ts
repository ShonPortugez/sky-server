import { Schema, model } from 'mongoose';
import { QuestionType } from '../enums';
import * as Response from './response.model'
import {baseSchemaOptions} from "../utils/abstractions/mongoBaseDocument";
import {BaseQuestion} from "./question.types";
import {QUESTION, QUESTION_DISCRIMINATOR_KEY, SURVEYS_COLLECTION} from "../utils/constants";

// Base Question Schema
export const BaseQuestionSchema = new Schema<BaseQuestion>({
    label: { type: String, required: true },
    description: { type: String, default: "" },
    type: {
        type: String,
        enum: Object.values(QuestionType),
        required: true
    } as any,
    isRequired: { type: Boolean, default: false },
    index: { type: Number, required: true },
    responses: []
}, {
    ...baseSchemaOptions,
    discriminatorKey: QUESTION_DISCRIMINATOR_KEY,
    collection: SURVEYS_COLLECTION
});

export const Question = model<BaseQuestion>(QUESTION, BaseQuestionSchema);

// Discriminators

// Shared Range Logic for Slider/Rate
const rangeFields = {
    minValue: { type: Number, required: true },
    maxValue: { type: Number, required: true }
};

export const SliderQuestion = Question.discriminator(QuestionType.SLIDER, new Schema({
    ...rangeFields,
    responses: [Response.SliderResponseSchema]
}));

export const RateQuestion = Question.discriminator(QuestionType.RATE, new Schema({
    ...rangeFields,
    responses: [Response.RateResponseSchema]
}));

export const TextQuestion = Question.discriminator(QuestionType.TEXT, new Schema({
    placeholder: { type: String, default: "" },
    responses: [Response.TextResponseSchema]
}));

export const MultiAnswerQuestion = Question.discriminator(QuestionType.MULTI, new Schema({
    options: { type: [String], required: true },
    responses: [Response.MultiAnswerResponseSchema]
}));

export const DateQuestion = Question.discriminator(QuestionType.DATE, new Schema({
    responses: [Response.DateResponseSchema]
}));

export const CheckboxQuestion = Question.discriminator(QuestionType.CHECKBOX, new Schema({
    responses: [Response.CheckboxResponseSchema]
}));