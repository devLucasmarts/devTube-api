import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { createUserServices, googleAuthServices, signinUserServices } from "../services/authServices";

export const signup = async (req: Request, res: Response) => {

    const { email, username, password } = req.body;

    const createdUser =  await createUserServices(email, username, password);

    if (createdUser?.error) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(createdUser.message);

    res.cookie("access_token", createdUser?.token, {
        httpOnly: true
    }).status(StatusCodes.CREATED).send(createdUser);
};

export const signin = async (req: Request, res: Response) => {

   const { email, password } = req.body;

   const loginUser = await signinUserServices(email, password);

   if (loginUser?.accountError) return res.status(StatusCodes.NOT_FOUND).send(loginUser.message);

   if (loginUser?.passwordError) return res.status(StatusCodes.UNAUTHORIZED).send(loginUser.message);

   res.cookie("access_token", loginUser?.token, {
    httpOnly: true
   }).status(StatusCodes.OK).send(loginUser?.accountData);
};

export const googleAuth = async (req: Request, res: Response) => {

    const { name, email, img } = req.body;
 
    const loginUser = await googleAuthServices(name, email, img);
 
    res.cookie("access_token", loginUser?.token, {
     httpOnly: true
    }).status(StatusCodes.OK).send(loginUser?.accountData);
 };
