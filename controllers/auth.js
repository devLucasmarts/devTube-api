import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

import { StatusCodes } from "http-status-codes";

export const signup = async (req, res) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    res.status(StatusCodes.CREATED).send("User has been crated!");
};
