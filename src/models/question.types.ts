import { BaseDocument } from "../database/mongoBaseDocument";
import { QuestionResponse } from "./response.types";
import { QuestionType } from "../enums";

export interface BaseQuestion extends BaseDocument {
    label: string;
    description: string;
    questionType: QuestionType;
    isRequired: boolean;
    index: number;
    responses: QuestionResponse[];
}

interface MinMaxQuestion extends BaseQuestion {
    minValue: number;
    maxValue: number;
}

export interface SliderQuestion extends MinMaxQuestion {
    questionType: QuestionType.SLIDER;
}
export interface RateQuestion extends MinMaxQuestion {
    questionType: QuestionType.RATE;
}

export interface TextQuestion extends BaseQuestion {
    questionType: QuestionType.TEXT;
    placeholder: string;
}

export interface MultiAnswerQuestion extends BaseQuestion {
    questionType: QuestionType.MULTI;
    options: string[];
}

export interface DateQuestion extends BaseQuestion {
    questionType: QuestionType.DATE;
}
export interface CheckboxQuestion extends BaseQuestion {
    questionType: QuestionType.CHECKBOX;
}