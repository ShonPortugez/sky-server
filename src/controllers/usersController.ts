import {catchAsync} from "../utils/catchAsync";
import {NextFunction, Response} from "express";
import {httpResponse} from "../utils/httpResponse";

export class UserController {
    getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        return httpResponse(200, "Great success", {}, res);
    })
}