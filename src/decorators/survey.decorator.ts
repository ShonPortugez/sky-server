import {createParamDecorator} from "routing-controllers";

export const SurveyParam = () => {
    return createParamDecorator({
        required: true,
        value: action => action.request.survey,
    })
}