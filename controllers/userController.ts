import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { addSubscription, deleteUser, getUser, updateUser } from "../services/userServices";

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
    const account = await getUser(req.params.id);

    if (account?.error) return res.status(StatusCodes.NOT_FOUND).send(account?.message);

    return res.status(StatusCodes.OK).json(account);
};

export const subscribe = async (req: any, res: Response) => {

    const channelAccountId = req.user.id;
    const userAccountId = req.params.id;

    const subscription = await addSubscription(channelAccountId, userAccountId);

    return res.status(StatusCodes.OK).json(subscription.message);
};

export const unsubscribe = async (req: Request, res: Response) => {

    
};

export const likeVideo = async (req: Request, res: Response) => {

    
};