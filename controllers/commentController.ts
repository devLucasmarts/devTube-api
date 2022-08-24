import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createCommentServices, deleteCommentServices } from "../services/commentsServices";

export const addComment = async (req: any, res: Response) => {

    const { videoId, userComment } = req.body;
    const { id } = req.user;

    const newComment = await createCommentServices(id, videoId, userComment);

    return res.status(StatusCodes.CREATED).json(newComment);
};

export const deleteComment = async (req: any, res: Response) => {

    const { commentId, videoId } = req.params;
    const { id: cookieId } = req.user.id;

    const deleteComment = await deleteCommentServices(commentId, videoId, cookieId);

    if (deleteComment?.error) return res.status(StatusCodes.FORBIDDEN).send(deleteComment?.message);

    return res.status(StatusCodes.OK).send(deleteComment?.message);
};

export const getComments = async (req: Request, res: Response) => {

};

