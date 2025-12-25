import { Schema, model, Types } from 'mongoose';
import {DB_SURVEYS_COLLECTION} from "../utils/constants";
import {baseSchemaOptions} from "../utils/abstractions/mongoBaseDocument";
import {BaseQuestionSchema} from "./question.model";
import {Survey} from "./survey.types";

const SurveySchema = new Schema<Survey>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    isActive: {
        type: Boolean,
        default: true
    },

    questions: [BaseQuestionSchema]

}, {
    ...baseSchemaOptions,
    collection: DB_SURVEYS_COLLECTION
});

export const SurveyModel = model<Survey>('Survey', SurveySchema);