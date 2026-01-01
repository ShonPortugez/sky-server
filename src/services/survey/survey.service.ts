import {inject, injectable} from "tsyringe";
import {Survey, SurveyModel, User} from "../../models";
import { SurveyData } from "../../types/survey.types";
import {QuestionHandler} from "../../handlers/question.handler";
import {CreateQuestionDto} from "../../types/question.types";
import {InternalServerError} from "routing-controllers";

@injectable()
export class SurveyService {
    constructor(@inject(QuestionHandler) private questionHandler: QuestionHandler) {}

    public async createSurvey(user: User, newSurvey: SurveyData) {
        return await SurveyModel.create({
            userId: user.id,
            ...newSurvey
        });
    }

    public async getSurveyById(surveyId: string, selectResponses: boolean = false){
        const query = SurveyModel.findById(surveyId)
        if(!selectResponses)
            query.select({ 'questions.responses': 0});

        return await query.exec();
    }

    public async getUserSurveys(user: User) {
        const surveys = await SurveyModel
            .find({ userId: user.id })
            .select({ 'questions': 0})
            .lean()
            .exec();

        return surveys;
    }

    public async updateSurvey(survey: Survey, newSurvey: SurveyData) {
        return await SurveyModel.findByIdAndUpdate(
            survey._id,
            {
                title: newSurvey.title,
                description: newSurvey.description,
                isActive: newSurvey.isActive,
            },
            {
                new: true,
                runValidators: true,
            }
        ).exec();
    }

    private getQuestionDbEntity(questionDto: CreateQuestionDto) {
        const questionEntity = this.questionHandler.resolveQuestionFromDto(questionDto)
        if(!questionEntity)
            throw new InternalServerError('Failed to resolve question entity');

        return questionEntity;
    }

    public async addSurveyQuestion(survey: Survey, questionDto: CreateQuestionDto, insertAt: number) {
        const questionEntity = this.getQuestionDbEntity(questionDto);
        await survey.updateOne({
                $push: {
                    questions: {
                        $each: [questionEntity],
                        $position: insertAt
                    }
                }
            },
            { runValidators: true }
        );

        return questionEntity;
    }

    public async repositionSurveyQuestion(survey: Survey, questionId: string, newIndex: number) {
        const fromIndex = survey.questions.findIndex(question => question._id.equals(questionId));

        const [question] = survey.questions.splice(fromIndex, 1);
        survey.questions.splice(newIndex, 0, question);

        await survey.save();
        return question;
    }

    public async updateSurveyQuestion(survey: Survey, questionId: string, updatedQuestion: CreateQuestionDto) {
        const questionEntity = this.getQuestionDbEntity(updatedQuestion);
        await SurveyModel.updateOne(
            {
                _id: survey.id,
                'questions._id': questionId,
            },
            {
                $set: {
                    'questions.$': {questionEntity}
                },
            },
            { runValidators: true }
        )

        return questionEntity;
    }

    public async deleteSurveyQuestion(survey: Survey, questionId: string){
        const updateResult = await SurveyModel.updateOne(
            { _id: survey.id },
            {
                $pull: {
                    questions: { _id: questionId }
                }
            }
        );

        return updateResult.acknowledged
    }
}