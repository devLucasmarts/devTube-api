import User from "../models/User";
import Video from "../models/Video";
var ObjectID = require('mongodb').ObjectID;


interface userResponse {
    _id?: object,
    username?: string,
    email?: string,
    img?: string,
    subscribers?: number,
    subscribedUsers?: [string],
    createdAt?: string,
    updatedAt?: string,
    error?: boolean;
    message?: string;
};

export const updateUser = async (userId: string, username: string, email: string, password: string, img: string) => {
    const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: { username, email, password, img }
    }, { new: true });

    const accountUpdated = {
        "_id": updatedUser?._id,
        "username": updatedUser?.username,
        "email": updatedUser?.email,
        "subscribers":  updatedUser?.subscribers,
        "subscribedUsers": updatedUser?.subscribedUsers,
    };

    return accountUpdated;
};


export const deleteUser = async (userId: string) => {
    await User.findByIdAndDelete(userId);

    return { message: 'User has been deleted.' };
};

export const getUser = async (userId: string):Promise<userResponse | null> => {
    const user = User.findById( new ObjectID(userId) , {
         _id: 1, 
         username: 1,
         email: 1,
         img: 1,
         subscribers: 1,
         subscribedUsers: 1
    });

    if (!user) return {error: true, message: 'Account not found.'};

    return user;
};

export const addSubscription = async (channelAccountId: string, userAccountId: string):Promise<userResponse> => {
    await User.findByIdAndUpdate(channelAccountId, {
        $push:{ subscribedUsers: userAccountId }
    });

    await User.findByIdAndUpdate(userAccountId, {
        $inc:{ subscribers: 1 }
    });

    return { message: 'Subscribed!' };
};

export const removeSubscription = async (channelAccountId: string, userAccountId: string):Promise<userResponse> => {
    await User.findByIdAndUpdate(channelAccountId, {
        $pull:{ subscribedUsers: userAccountId }
    });

    await User.findByIdAndUpdate(userAccountId, {
        $inc:{ subscribers: -1 }
    });

    return { message: 'Unsubscribed!' };
};

export const likeVideoServices = async (id: string, videoId: string):Promise<userResponse> => {
    await Video.findByIdAndUpdate(videoId, {
        $addToSet: { likes: id },
        $pull: { dislikes: id }
    });

    return { message: 'Feedback has been sent!' };
};