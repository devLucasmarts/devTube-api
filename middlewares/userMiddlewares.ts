import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";


export const verifyToken = (req: any , _res: any , next: NextFunction) => {
    const token = req.cookies.access_token;

    if (!token) return { status: StatusCodes.UNAUTHORIZED, message: "You are not authenticated!" };

    verify(token, process.env.JWT ?? '', (err: any, user: any) => {
        if (err) return { status: StatusCodes.FORBIDDEN, message: "Token is not valid!" };
        req.user = user;
        next();
    });
};