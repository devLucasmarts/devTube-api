import User from "../models/User";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

interface signinResponse {
    accountError?: boolean;
    passwordError?: boolean;
    message?: string;
    token?: string;
    accountData?: object
};

interface signUpResponse {
    error?: boolean;
    message?: string;
};

export const createUserServices = async (email: string, username: string, password: string): Promise<signUpResponse | undefined> => {

    if (await User.findOne({ email })) return {error: true, message: 'Email already in use!'};
    if (await User.findOne({ username })) return {error: true, message: 'Username already in use!'};

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ email, username, password: hash });

    await newUser.save();
};

export const signinUserServices = async (username: string, password: string ): Promise<signinResponse | undefined> => {

    const userAccount = await User.findOne({ username });
    if (!userAccount) return { accountError: true, message: 'User not found!' };

    const isCorrect = await bcrypt.compare(password, userAccount.password);
    if (!isCorrect) return { passwordError: true, message: 'Incorrect password' };

    const token = sign({ id: userAccount._id }, process.env.JWT ?? '');

    const accountData = {
        id: userAccount._id,
        username: userAccount.username,
        email: userAccount.email,
        subscribers: userAccount.subscribers,
        subscribedUsers: userAccount.subscribedUsers,
    }

    if (userAccount) return { accountData , token };
};

export const googleAuthServices = async (name: string, email: string, img: string): Promise<signinResponse | undefined> => {

    const userAccount = await User.findOne({ email });
   
   if (userAccount) {
        const token = sign({ id: userAccount?._id }, process.env.JWT ?? '');

        const accountData = {
            id: userAccount?._id,
            username: userAccount?.username,
            email: userAccount?.email,
            img: userAccount?.img,
            subscribers: userAccount?.subscribers,
            subscribedUsers: userAccount?.subscribedUsers,
        }

        return { accountData , token };
   } else {
        const newUser = new User({
            username: name,
            email: email,
            img: img,
            fromGoogle: true,
        })

        const savedUser = await newUser.save();

        const token = sign({ id: savedUser?._id }, process.env.JWT ?? '');

        return { savedUser , token } as signinResponse;
   }
};