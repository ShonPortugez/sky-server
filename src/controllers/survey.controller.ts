import {inject, injectable} from "tsyringe";
import {Body, Get, JsonController, Param, Patch, Post, Res, UseBefore} from "routing-controllers";
import {SurveyService} from "../services/survey/survey.service";
import {SurveyData} from "../types/survey.types";
import {CurrentUser} from "../decorators/user.decorator";
import {Survey, User} from "../models";
import {AddQuestionDto, UpdateQuestionDto, UpdateQuestionIndexDto} from "../types/question.types";
import {SurveyParam} from "../decorators/survey.decorator";
import {SurveyMiddleware} from "../middleware/survey.middleware";
import {SurveyOwnershipMiddleware} from "../middleware/surveyOwnership.middleware";
import {Response} from "express";
import {UserMiddleware} from "../middleware/user.middleware";

@injectable()
@JsonController('/surveys')
export class SurveyController{
    constructor(@inject(SurveyService) private surveyService: SurveyService) {}

    @Post('/')
    @UseBefore(UserMiddleware)
    async createSurvey(@Body() surveyData: SurveyData, @CurrentUser() currentUser: User, @Res() res: Response) {
        await this.surveyService.createSurvey(currentUser, surveyData);
        return res.status(200);
    }

    @Get('/user')
    @UseBefore(UserMiddleware)
    async getSurveys(
        @CurrentUser() user: User,
    ){
        return await this.surveyService.getUserSurveys(user);
    }

    @Get('/:id')
    @UseBefore(UserMiddleware)
    @UseBefore(SurveyMiddleware)
    async getSurveyById(@SurveyParam() survey: Survey) {
        return survey;
    }

    @Patch('/:id')
    @UseBefore(UserMiddleware, SurveyMiddleware, SurveyOwnershipMiddleware)
    async updateSurvey(@SurveyParam() survey: Survey, surveyDto: SurveyData) {
        await this.surveyService.updateSurvey(survey, surveyDto);
    }

    @Patch('/:id')
    @UseBefore(UserMiddleware, SurveyMiddleware, SurveyOwnershipMiddleware)
    async addQuestionToSurvey(
        @SurveyParam() survey: Survey,
        @CurrentUser() currentUser: User,
        @Body() questionDto: AddQuestionDto) {
        return await this.surveyService.addSurveyQuestion(survey, questionDto.question, questionDto.insertAt);
    }

    @Patch('/:id/questionId')
    @UseBefore(UserMiddleware, SurveyMiddleware, SurveyOwnershipMiddleware)
    async updateQuestionOfSurvey(
        @SurveyParam() survey: Survey,
        @Param('questionId') questionId: string,
        @Body() questionDto: UpdateQuestionDto,
        @Res() response: Response
    ) {
        await this.surveyService.updateSurveyQuestion(survey, questionId, questionDto.question);
        return response.status(200).json({ success: true });
    }

    @Patch('/:id/questionId/reposition')
    @UseBefore(UserMiddleware, SurveyMiddleware, SurveyOwnershipMiddleware)
    async updateQuestionIndexOfSurvey(
        @SurveyParam() survey: Survey,
        @Param('questionId') questionId: string,
        @Body() questionDto: UpdateQuestionIndexDto,
        @Res() response: Response

    ) {
        await this.surveyService.repositionSurveyQuestion(survey, questionId, questionDto.newIndex);
        return response.status(200).json({ success: true });
    }
}