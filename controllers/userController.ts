import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const updateUserAccount = async (req: Request, res: Response) => {

    if (req.params.id === req.params.user) {

    } else {
        return res.status(StatusCodes.FORBIDDEN).send("You can update only your account!");
    }
};

export const deleteUserAccount = async (req: Request, res: Response) => {

    
};

export const getUserAccount = async (req: Request, res: Response) => {

    
};

export const subscribe = async (req: Request, res: Response) => {

    
};

export const unsubscribe = async (req: Request, res: Response) => {

    
};

export const likeVideo = async (req: Request, res: Response) => {

    
};