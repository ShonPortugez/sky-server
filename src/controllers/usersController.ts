import {catchAsync} from "../utils/catchAsync";
import {NextFunction, Response} from "express";
import {httpDataResponse, httpResponse} from "../utils/httpResponse";

export class UserController {

    createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        return httpDataResponse(201, "Created", {}, res);
    })

    getUserById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        return httpDataResponse(200, "Fetched user", {}, res);
    })

    updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        return httpDataResponse(200, "Updated", {}, res);
    })

    deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        return httpDataResponse(204, "Deleted", {}, res);
    })
}