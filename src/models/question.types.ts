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

export interface SliderQuestion extends MinMaxQuestion { }
export interface RateQuestion extends MinMaxQuestion { }

export interface TextQuestion extends BaseQuestion {
    placeholder: string
}

export interface MultiAnswerQuestion extends BaseQuestion {
    options: string[];
}

export interface DateQuestion extends BaseQuestion { }
export interface CheckboxQuestion extends BaseQuestion { }