import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createCommentServices, deleteCommentServices, getCommentsServices } from "../services/commentsServices";

export const addComment = async (req: any, res: Response) => {

    const { videoId, userComment } = req.body;
    const { id } = req.user;

    const newComment = await createCommentServices(id, videoId, userComment);

    if (newComment?.error) return res.status(StatusCodes.BAD_REQUEST).send(newComment?.message);

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

    const { videoId } = req.params;

    const comments = await getCommentsServices(videoId);

    if (comments?.error) return res.status(StatusCodes.BAD_REQUEST).send(comments?.message);

    if (comments?.notFoundError) return res.status(StatusCodes.NOT_FOUND).send(comments?.message);

    return res.status(StatusCodes.OK).json(comments);
};

