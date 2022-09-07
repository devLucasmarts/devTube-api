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

const validUserCredentials = async (email: string, username: string,) => {
    if (await User.findOne({ email })) return {error: true, message: 'Email already in use!'};

    if (await User.findOne({ username })) return {error: true, message: 'Username already in use!'};
};

const encryptPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
};

export const createUserServices = async (email: string, username: string, password: string): Promise<signUpResponse | undefined> => {

    const validUser = await validUserCredentials(email, username);

    if (validUser) return { error: validUser.error, message: validUser.message };

    const encryptedPassword = encryptPassword(password); 

    const newUser = new User({ email, username, password: encryptedPassword });

    await newUser.save();
};

export const signinUserServices = async (email: string, password: string ): Promise<signinResponse | undefined> => {

    const userAccount = await User.findOne({ email });
    if (!userAccount) return { accountError: true, message: 'User not found!' };

    const isCorrect = await bcrypt.compare(password, userAccount.password);
    if (!isCorrect) return { passwordError: true, message: 'Incorrect password' };

    const token = sign({ id: userAccount._id }, process.env.JWT ?? '');

    const accountData = {
        _id: userAccount._id,
        username: userAccount.username,
        email: userAccount.email,
        img: userAccount.img,
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
            _id: userAccount?._id,
            username: userAccount?.username,
            email: userAccount?.email,
            img: userAccount?.img,
            fromGoogle: userAccount?.fromGoogle,
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