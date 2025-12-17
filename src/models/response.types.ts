import {BaseDocument} from "../utils/abstractions/mongoBaseDocument";

// Base & Abstractions
export interface QuestionResponse extends BaseDocument {}

interface ValueResponse<T> extends QuestionResponse {
    value: T;
}

// Types
export interface SliderResponse extends ValueResponse<number> {}

export interface RateResponse extends ValueResponse<number> {}

export interface TextResponse extends ValueResponse<string> {}

export interface MultiAnswerResponse extends ValueResponse<number> {}

export interface DateResponse extends ValueResponse<Date> {}

export interface CheckboxResponse extends ValueResponse<boolean> {}