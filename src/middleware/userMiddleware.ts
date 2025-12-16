import {User} from "../models/user";
import { Request, Response, NextFunction } from 'express';
import mongoose from "mongoose";

export const UserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const objectId = new mongoose.Types.ObjectId(req.params.id);
        const user = await User.findById(objectId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};