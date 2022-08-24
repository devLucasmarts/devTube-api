import Comment from "../models/Comment";

export const createCommentServices = async (id: string, videoId: string, userComment: string) => {
    const newComment = new Comment({  userId: id, videoId, userComment  });

    const savedComment = await newComment.save();

    return savedComment;
};

export const deleteCommentServices = async () => {

};

export const getCommentsServices = async () => {

};