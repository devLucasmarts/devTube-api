import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { createUser, signinUser } from "../services/authServices";

export const signup = async (req: Request, res: Response) => {

    const createdUser =  await createUser(req.body);

    if (createdUser?.error) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(createdUser.message);

    res.status(StatusCodes.CREATED).send("User has been crated!");
};

export const signin = async (req: Request, res: Response) => {

   const loginUser = await signinUser(req.body);

   if (loginUser?.accountError) return res.status(StatusCodes.NOT_FOUND).send(loginUser.message);

   if (loginUser?.passwordError) return res.status(StatusCodes.UNAUTHORIZED).send(loginUser.message);

   res.cookie("access_token", loginUser?.token, {
    httpOnly: true
   }).status(StatusCodes.OK).send(loginUser?.accountData);
};
