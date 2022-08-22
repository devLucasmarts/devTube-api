import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import createUser from "../services/authServices";

export const signup = async (req: Request, res: Response) => {

    const createdUser =  await createUser(req.body);

    if (createdUser?.error) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(createdUser.message);

    res.status(StatusCodes.CREATED).send("User has been crated!");
};
