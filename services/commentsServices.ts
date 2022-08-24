import Comment from "../models/Comment";
import Video from "../models/Video";

export const createCommentServices = async (id: string, videoId: string, userComment: string) => {

    const newComment = new Comment({  userId: id, videoId, userComment  });

    const savedComment = await newComment.save();

    return savedComment;
};

export const deleteCommentServices = async (commentId: string, videoId: string, cookieId: string) => {

    const comment = await Comment.findById(commentId);
    const video = await Video.findById(videoId);

    if (cookieId === comment?.userId || cookieId === video?.userId) {
        await Comment.findByIdAndDelete(commentId);

        return { message: 'Comment has been delete' };
    } else {
        return { error: true, message: 'You can delete only your comment!' }
    };

};

export const getCommentsServices = async (videoId: string) => {
    const comments = await Comment.find({ videoId });

    return comments;
};