import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { 
    addNewVideo,
    deleteUserVideo,
    getVideoById,
    getVideosByTags,
    incrementViews,
    randomVideos,
    search,
    subsVideos,
    trendVideos,
    updateUserVideo
} from "../services/videoServices";

export const addVideo = async (req: any, res: Response) => {
    const { id } = req.user;
    const { title, description, imgUrl, videoUrl } = req.body;
    console.log(id)
    const newVideo = await addNewVideo(id, title, description, imgUrl, videoUrl);

    if (newVideo.error) return res.status(StatusCodes.BAD_REQUEST).send(newVideo.message);

    return res.status(StatusCodes.CREATED).json(newVideo);
};

export const updateVideo = async (req: any, res: Response) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const { title, description, imgUrl, videoUrl } = req.body;

    const updatedVideo = await updateUserVideo(id, userId, title, description, imgUrl, videoUrl);

    if (updatedVideo?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(updatedVideo.message);

    if (updatedVideo?.unauthorizedError) return res.status(StatusCodes.UNAUTHORIZED).send(updatedVideo.message);

    if (updatedVideo?.error) return res.status(StatusCodes.BAD_REQUEST).send(updatedVideo.message);

    return res.status(StatusCodes.OK).json(updatedVideo);
};

export const deleteVideo = async (req: any, res: Response) => {
    const { id } = req.params;
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

export const trendVideo = async (_req: Request, res: Response) => {

    const videos = await trendVideos();

    if (videos?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(videos?.message);

    return res.status(StatusCodes.OK).json(videos);
};

export const randomVideo = async (_req: Request, res: Response) => {

    const videos = await randomVideos();

    if (videos?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(videos?.message);

    return res.status(StatusCodes.OK).json(videos);
};

export const subsVideo = async (req: any, res: Response) => {
    const { id } = req.user;

    const videos = await subsVideos(id);

    if (videos?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(videos?.message);

    return res.status(StatusCodes.OK).json(videos);
};

export const getVideoByTags = async (req: Request, res: Response) => {

    const tags = (req.query.tags as string)?.split(',')

    const videos = await getVideosByTags(tags);

    if (videos?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(videos?.message);

    return res.status(StatusCodes.OK).json(videos);
};

export const searchVideo = async (req: Request, res: Response) => {
    
    const query = (req.query.q as string);

    const videos = await search(query);

    if (videos?.notFounderror) return res.status(StatusCodes.NOT_FOUND).send(videos?.message);

    return res.status(StatusCodes.OK).json(videos);
};