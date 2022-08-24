import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createCommentServices } from "../services/commentsServices";

export const addComment = async (req: any, res: Response) => {

    const { videoId, userComment } = req.body;
    const { id } = req.user;

    const newComment = await createCommentServices(id, videoId, userComment);

    return res.status(StatusCodes.CREATED).json(newComment);
};

export const deleteComment = async (req: Request, res: Response) => {

};


export const getComments = async (req: Request, res: Response) => {

};

