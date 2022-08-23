import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { 
    addNewVideo,
    deleteUserVideo,
    getVideoById,
    incrementViews,
    randomVideos,
    updateUserVideo
} from "../services/videoServices";

export const addVideo = async (req: any, res: Response) => {
    const { id } = req.user.id;
    const { title, description, imgUrl, videoUrl } = req.body;

    const newVideo = await addNewVideo(id, title, description, imgUrl, videoUrl);

    if (newVideo.error) return res.status(StatusCodes.BAD_REQUEST).send(newVideo.message);

    return res.status(StatusCodes.CREATED).json(newVideo);
};

export const updateVideo = async (req: any, res: Response) => {
    const { id } = req.params.id;
    const { id: userId } = req.user;
    const { title, description, imgUrl, videoUrl } = req.body;

    const updatedVideo = await updateUserVideo(id, userId, title, description, imgUrl, videoUrl);

    if (updatedVideo?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(updatedVideo.message);

    if (updatedVideo?.unauthorizedError) return res.status(StatusCodes.UNAUTHORIZED).send(updatedVideo.message);

    if (updatedVideo?.error) return res.status(StatusCodes.BAD_REQUEST).send(updatedVideo.message);

    return res.status(StatusCodes.OK).json(updatedVideo);
};

export const deleteVideo = async (req: any, res: Response) => {
    const { id } = req.params.id;
    const { id: userId } = req.user;

    const deletedVideo = await deleteUserVideo(id, userId);

    if (deletedVideo?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(deletedVideo?.message);

    if (deletedVideo?.unauthorizedError) return res.status(StatusCodes.UNAUTHORIZED).send(deletedVideo?.message);

    return res.status(StatusCodes.OK).send(deletedVideo?.message);
};

export const getVideo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const video = await getVideoById(id);

    if (video?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(video?.message);

    return res.status(StatusCodes.OK).json(video);
};

export const viewVideo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const video = await incrementViews(id);

    return res.status(StatusCodes.OK).send(video?.message);
};

export const trendVideo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const video = await getVideoById(id);

    if (video?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(video?.message);

    return res.status(StatusCodes.OK).json(video);
};

export const randomVideo = async (_req: Request, res: Response) => {

    const video = await randomVideos();

    if (video?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(video?.message);

    return res.status(StatusCodes.OK).json(video);
};

export const subsVideo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const video = await getVideoById(id);

    if (video?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(video?.message);

    return res.status(StatusCodes.OK).json(video);
};
