import {User} from "../models/user";
import { Request, Response, NextFunction } from 'express';
import mongoose from "mongoose";
import {isValidObjectId} from "../utils/validDbEntityId";
import {httpResponse} from "../utils/httpResponse";
import {HttpStatus} from "../enums/httpStatus";

export const UserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!isValidObjectId(req.params.id))
            return httpResponse(HttpStatus.BAD_REQUEST, 'Invalid Id syntax', res);

        const objectId = new mongoose.Types.ObjectId(req.params.id);
        // const user = await User.findById(objectId);
        // if (!user) return res.status(404).json({ message: 'User not found' });
        // req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};