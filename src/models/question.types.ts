import {BaseDocument} from "../utils/abstractions/mongoBaseDocument";
import {QuestionResponse} from "./response.types";
import {QuestionType} from "../enums";

// Base & Abstractions
export interface BaseQuestion extends BaseDocument{
    label: string;
    description: string;
    type: QuestionType;
    isRequired: boolean;
    index: number;
    responses: QuestionResponse[];
}

interface MinMaxQuestion extends BaseQuestion {
    minValue: number;
    maxValue: number;
}

// Question Types
export interface SliderQuestion extends MinMaxQuestion {}
export interface RateQuestion extends MinMaxQuestion {}

export interface TextQuestion extends BaseQuestion {
    placeholder: string
}

export interface MultiAnswerQuestion extends BaseQuestion {
    options: string[];
}

export interface DateQuestion extends BaseQuestion {}
export interface CheckboxQuestion extends BaseQuestion {}