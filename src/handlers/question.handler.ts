import {injectable} from "tsyringe";
import {CreateQuestionDto} from "../types/question.types";
import {QuestionType} from "../enums";
import {BaseQuestion} from "models/question.types";
import {CheckboxQuestion, DateQuestion, MultiAnswerQuestion, RateQuestion, SliderQuestion, TextQuestion} from "../models/question.model";

const questionFactory: Record<QuestionType, (data: CreateQuestionDto) => BaseQuestion> = {
    [QuestionType.SLIDER]: (data) => new SliderQuestion(data),
    [QuestionType.RATE]: (data) => new RateQuestion(data),
    [QuestionType.TEXT]: (data) => new TextQuestion(data),
    [QuestionType.MULTI]: (data) => new MultiAnswerQuestion(data),
    [QuestionType.DATE]: (data) => new DateQuestion(data),
    [QuestionType.CHECKBOX]: (data) => new CheckboxQuestion(data),
};

@injectable()
export class QuestionHandler {
    public resolveQuestionFromDto(data: CreateQuestionDto) {
        return questionFactory[data.questionType]({...data});
    }
}