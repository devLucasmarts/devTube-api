import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";

import UserDto from "../dtos/User.dto";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;

    if (!token) return { status: StatusCodes.UNAUTHORIZED, message: "You are not authenticated!" };

    verify(token, process.env.JWT ?? '', (err: any, user: any) => {
        if (err) return { status: StatusCodes.FORBIDDEN, message: "Token is not valid!" };
        req.body.username = user;
    });

    next();
};