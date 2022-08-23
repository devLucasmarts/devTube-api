import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { deleteUser, updateUser } from "../services/userServices";

export const updateUserAccount = async (req: any, res: any) => {

    if (req.params.id === req.user.id) {
        const updatedUser = await updateUser(req.params.id, req.body);

        res.status(StatusCodes.OK).json(updatedUser);
    } else {
        return res.status(StatusCodes.FORBIDDEN).send("You can update only your account!");
    };
};

export const deleteUserAccount = async (req: any, res: any) => {
    if (req.params.id === req.user.id) {
        const deletedUser = await deleteUser(req.params.id);

        res.status(StatusCodes.OK).send(deletedUser.message);
    } else {
        return res.status(StatusCodes.FORBIDDEN).send("You can delete only your account!");
    };
    
};

export const getUserAccount = async (req: Request, res: Response) => {

    
};

export const subscribe = async (req: Request, res: Response) => {

    
};

export const unsubscribe = async (req: Request, res: Response) => {

    
};

export const likeVideo = async (req: Request, res: Response) => {

    
};