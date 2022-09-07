import User from "../models/User";
import Video from "../models/Video";
import bcrypt from "bcryptjs";
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

const validateUserCredentials = async (username: string, email: string, password: string) => {
    if (await User.findOne({ email })) return {error: true, message: 'Email already in use!'};

    if (await User.findOne({ username })) return {error: true, message: 'Username already in use!'};

    if (password && password.length < 8) return { error: true, message: 'The password must have 8 characters or more.' };

    if (password && typeof password !== 'string') return { error: true, message: 'The password must have letters, numbers and/or symbols.' };
};

const encryptPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};

export const updateUserServices = async (userId: string, username: string, email: string, password: string, img: string):Promise<userResponse | null> => {

    const userCredentialsValidation = await validateUserCredentials(username, email, password);

    if (userCredentialsValidation) return { error: userCredentialsValidation.error, message: userCredentialsValidation.message };

    const encryptedPassword = password && encryptPassword(password);

    const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: { username, email, password: encryptedPassword, img }
    }, { new: true });

    const accountUpdated = {
        "_id": updatedUser?._id,
        "username": updatedUser?.username,
        "email": updatedUser?.email,
        "img": updatedUser?.img,
        "subscribers":  updatedUser?.subscribers,
        "subscribedUsers": updatedUser?.subscribedUsers,
    };

    return accountUpdated;
};


export const deleteUserServices = async (userId: string):Promise<userResponse | null> => {
    await User.findByIdAndDelete(userId);
    await Video.deleteMany().where({ userId: userId });

    return { message: 'User has been deleted.' };
};

export const getUserServices = async (userId: string):Promise<userResponse | null> => {
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

export const addSubscriptionServices = async (channelAccountId: string, userAccountId: string):Promise<userResponse> => {
    await User.findByIdAndUpdate(channelAccountId, {
        $push:{ subscribedUsers: userAccountId }
    });

    await User.findByIdAndUpdate(userAccountId, {
        $inc:{ subscribers: 1 }
    });

    return { message: 'Subscribed!' };
};

export const removeSubscriptionServices = async (channelAccountId: string, userAccountId: string):Promise<userResponse> => {
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

export const dislikeVideoServices = async (id: string, videoId: string):Promise<userResponse> => {
    await Video.findByIdAndUpdate(videoId, {
        $addToSet: { dislikes: id },
        $pull: { likes: id }
    });

    return { message: 'Feedback has been sent!' };
};