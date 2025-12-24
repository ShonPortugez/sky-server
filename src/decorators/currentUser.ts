import {createParamDecorator} from "routing-controllers";

export const CurrentUser = () => {
    return createParamDecorator({
        required: true,
        value: action => action.request.user,
    })
}