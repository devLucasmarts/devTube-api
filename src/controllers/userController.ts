import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
    addSubscriptionServices,
    deleteUserServices,
    dislikeVideoServices,
    getUserServices,
    likeVideoServices,
    removeSubscriptionServices,
    updateUserServices
} from "../services/userServices";

export const updateUserAccount = async (req: any, res: Response) => {

    const { id: accountId } = req.params;
    const { id: tokenId } = req.user;
    const { username, email, password, img } = req.body;

    if (accountId === tokenId) {
        const updatedUser = await updateUserServices(accountId, username, email, password, img);

        if (updatedUser?.error) return res.status(StatusCodes.BAD_REQUEST).send(updatedUser?.message);

        res.status(StatusCodes.OK).json(updatedUser);
    } else {
        return res.status(StatusCodes.FORBIDDEN).send("You can update only your account!");
    };
};

export const deleteUserAccount = async (req: any, res: Response) => {

    const { id: accountId } = req.params;
    const { id: tokenId } = req.user;

    if (accountId === tokenId) {
        const deletedUser = await deleteUserServices(accountId);

        res.status(StatusCodes.OK).send(deletedUser.message);
    } else {
        return res.status(StatusCodes.FORBIDDEN).send("You can delete only your account!");
    };
    
};

export const getUserAccount = async (req: Request, res: Response) => {

    const { id } = req.params;

    const account = await getUserServices(id);

    if (account?.error) return res.status(StatusCodes.NOT_FOUND).send(account?.message);

    return res.status(StatusCodes.OK).json(account);
};

export const subscribe = async (req: any, res: Response) => {

    const channelAccountId = req.user.id;
    const userAccountId = req.params.id;

    const subscription = await addSubscriptionServices(channelAccountId, userAccountId);

    return res.status(StatusCodes.OK).json(subscription.message);
};

export const unsubscribe = async (req: any, res: Response) => {

    const channelAccountId = req.user.id;
    const userAccountId = req.params.id;

    const unsubscription = await removeSubscriptionServices(channelAccountId, userAccountId);

    return res.status(StatusCodes.OK).json(unsubscription.message);
};

export const likeVideo = async (req: any, res: Response) => {

    const id = req.user.id;
    const videoId = req.params.videoId;

    const like = await likeVideoServices(id, videoId);

    return res.status(StatusCodes.OK).json(like.message);
};

export const dislikeVideo = async (req: any, res: Response) => {

    const id = req.user.id;
    const videoId = req.params.videoId;

    const dislike = await dislikeVideoServices(id, videoId);

    return res.status(StatusCodes.OK).json(dislike.message);
};
