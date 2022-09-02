import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { 
    addNewVideoServices,
    deleteUserVideoServices,
    getChannelVideoByIdServices,
    getVideoByIdServices,
    getVideosByTagsServices,
    incrementViewsServices,
    randomVideosServices,
    searchServices,
    subsVideosServices,
    trendVideosServices,
    updateUserVideoServices
} from "../services/videoServices";

export const addVideo = async (req: any, res: Response) => {
    const { id } = req.user;
    const { title, description, imgUrl, videoUrl, tags } = req.body;

    const newVideo = await addNewVideoServices(id, title, description, imgUrl, videoUrl, tags);

    if (newVideo?.error) return res.status(StatusCodes.BAD_REQUEST).send(newVideo.message);

    return res.status(StatusCodes.CREATED).json(newVideo);
};

export const updateVideo = async (req: any, res: Response) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const { title, description, imgUrl, videoUrl } = req.body;

    const updatedVideo = await updateUserVideoServices(id, userId, title, description, imgUrl, videoUrl);

    if (updatedVideo?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(updatedVideo.message);

    if (updatedVideo?.unauthorizedError) return res.status(StatusCodes.UNAUTHORIZED).send(updatedVideo.message);

    if (updatedVideo?.error) return res.status(StatusCodes.BAD_REQUEST).send(updatedVideo.message);

    return res.status(StatusCodes.OK).json(updatedVideo);
};

export const deleteVideo = async (req: any, res: Response) => {
    const { id } = req.params;
    const { id: userId } = req.user;

    const deletedVideo = await deleteUserVideoServices(id, userId);

    if (deletedVideo?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(deletedVideo?.message);

    if (deletedVideo?.unauthorizedError) return res.status(StatusCodes.UNAUTHORIZED).send(deletedVideo?.message);

    return res.status(StatusCodes.OK).send(deletedVideo?.message);
};

export const getVideo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const video = await getVideoByIdServices(id);

    if (video?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(video?.message);

    return res.status(StatusCodes.OK).json(video);
};

export const getChannelVideos = async (req: Request, res: Response) => {
    const { id } = req.params;

    const video = await getChannelVideoByIdServices(id);

    if (video?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(video?.message);

    return res.status(StatusCodes.OK).json(video);
};

export const viewVideo = async (req: Request, res: Response) => {
    const { id } = req.params;

    const video = await incrementViewsServices(id);

    return res.status(StatusCodes.OK).send(video?.message);
};

export const trendVideo = async (_req: Request, res: Response) => {

    const videos = await trendVideosServices();

    if (videos?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(videos?.message);

    return res.status(StatusCodes.OK).json(videos);
};

export const randomVideo = async (_req: Request, res: Response) => {

    const videos = await randomVideosServices();

    if (videos?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(videos?.message);

    return res.status(StatusCodes.OK).json(videos);
};

export const subsVideo = async (req: any, res: Response) => {
    const { id } = req.user;

    const videos = await subsVideosServices(id);

    if (videos?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(videos?.message);

    return res.status(StatusCodes.OK).json(videos);
};

export const getVideoByTags = async (req: Request, res: Response) => {

    const tags = (req.query.tags as string)?.split(',')

    const videos = await getVideosByTagsServices(tags);

    if (videos?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(videos?.message);

    return res.status(StatusCodes.OK).json(videos);
};

export const searchVideo = async (req: Request, res: Response) => {
    
    const query = (req.query.q as string);

    const videos = await searchServices(query);

    if (videos?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(videos?.message);

    return res.status(StatusCodes.OK).json(videos);
};