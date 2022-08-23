import User from "../models/User";
import UserDto from "../dtos/User.dto";

export const updateUser = async (userId: string, user: UserDto) => {
    const updatedUser = await User.findByIdAndUpdate(userId, {
        $set: user
    }, { new: true });

    const accountUpdated = {
        "_id": updatedUser?._id,
        "username": updatedUser?.username,
        "email": updatedUser?.email,
        "subscribers":  updatedUser?.subscribers,
        "subscribedUsers": updatedUser?.subscribedUsers,
        "createdAt": updatedUser?.createdAt,
        "updatedAt": updatedUser?.updatedAt,
    };

    return accountUpdated;
};


export const deleteUser = async (userId: string) => {
    await User.findByIdAndDelete(userId);

    return { message: 'User has been deleted.' };
};