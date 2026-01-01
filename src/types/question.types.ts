import {CheckboxQuestion, DateQuestion, MultiAnswerQuestion, RateQuestion, SliderQuestion, TextQuestion} from "../models";
import {BaseDocument} from "../database/mongoBaseDocument";

export type CreateQuestionDto =
    | Omit<SliderQuestion, keyof BaseDocument | 'responses'>
    | Omit<RateQuestion, keyof BaseDocument | 'responses'>
    | Omit<TextQuestion, keyof BaseDocument | 'responses'>
    | Omit<MultiAnswerQuestion, keyof BaseDocument | 'responses'>
    | Omit<DateQuestion, keyof BaseDocument | 'responses'>
    | Omit<CheckboxQuestion, keyof BaseDocument | 'responses'>;

export type AddQuestionDto = {
    question: CreateQuestionDto;
    insertAt: number;
};

export type UpdateQuestionDto = {
    question: CreateQuestionDto;
}

export type UpdateQuestionIndexDto = {
    newIndex: number;
}