import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const signup = async (req: Request, res: Response) => {

 

    res.status(StatusCodes.CREATED).send("User has been crated!");
};
