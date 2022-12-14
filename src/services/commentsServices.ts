import Comment from "../models/Comment";
import Video from "../models/Video";

interface commentServicesResponse {
    userId?: string;
	videoId?: string;
	userComment?: string;
    createdAt?: string;
	updatedAt?: string;
    error?: boolean;
    notFoundError?: boolean;
    message?: string;
    comments?: object[];
};

const commentValidation = async (videoId: string, userComment: string) => {
    if (!videoId) return { error: true, message: 'videoId is required!' };

    if (!userComment) return { error: true, message: 'Please write some comment' };
};

export const createCommentServices = async (id: string, videoId: string, userComment: string):Promise<commentServicesResponse | undefined> => {

    const validComment = await commentValidation(videoId, userComment);

    if (validComment) return { error: validComment.error, message: validComment.message };

    const newComment = new Comment({  userId: id, videoId, userComment  });

    const savedComment = await newComment.save();

    return savedComment;
};

export const deleteCommentServices = async (commentId: string, videoId: string, cookieId: string):Promise<commentServicesResponse | undefined> => {

    const comment = await Comment.findById(commentId);
    const video = await Video.findById(videoId);

    if (cookieId === comment?.userId || cookieId === video?.userId) {
        await Comment.findByIdAndDelete(commentId);

        return { message: 'Comment has been delete' };
    } else {
        return { error: true, message: 'You can delete only your comment!' }
    };

};

export const getCommentsServices = async (videoId: string):Promise<commentServicesResponse | undefined> => {

    if (!videoId) return { error: true, message: 'Video id is required!' };

    const comments = await Comment.find({ videoId });

    return comments as commentServicesResponse;
};