import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import createUser from "../services/authServices";

export const signup = async (req: Request, res: Response) => {

    await createUser(req.body);

    res.status(StatusCodes.CREATED).send("User has been crated!");
};
