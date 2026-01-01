import { BaseDocument } from "../database/mongoBaseDocument";
import { QuestionResponse } from "./response.types";
import { QuestionType } from "../enums";

export interface BaseQuestion extends BaseDocument {
    label: string;
    description: string;
    questionType: QuestionType;
    isRequired: boolean;
    responses?: QuestionResponse[];
}

interface MinMaxQuestion extends BaseQuestion {
    minValue: number;
    maxValue: number;
}

export type SliderQuestion = MinMaxQuestion & { questionType: QuestionType.SLIDER }
export type RateQuestion = MinMaxQuestion & { questionType: QuestionType.RATE }
export type TextQuestion = BaseQuestion & { questionType: QuestionType.TEXT, placeholder: string}
export type MultiAnswerQuestion = BaseQuestion & { questionType: QuestionType.MULTI, options: string[]; }
export type DateQuestion = BaseQuestion & { questionType: QuestionType.DATE }
export type CheckboxQuestion = BaseQuestion & { questionType: QuestionType.CHECKBOX; }