import {Response} from "express";

export function httpResponse(status: number, message: string, res: Response): Response {
    return res.status(status).json({
        message,
    })
}

export function httpDataResponse(status: number, message: string, data: any, res: Response): Response {
    return res.status(status).json({
        message,
        data,
    })
}