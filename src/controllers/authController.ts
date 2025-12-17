import {catchAsync} from "../utils/catchAsync";
import {NextFunction, Response} from "express";
import {httpDataResponse, httpResponse} from "../utils/httpResponse";

export class AuthController {

    getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        return httpDataResponse(500, "Internal server error", {}, res);
    })
}