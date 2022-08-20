import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import mongoose from "mongoose";
import User from "../models/User";
import bcrypt from "bcryptjs";


export const signup = async (req: Request, res: Response) => {

    const { password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    res.status(StatusCodes.CREATED).send("User has been crated!");
};
