import User from "../models/User";
import bcrypt from "bcryptjs";
import UserDto from "../dtos/User.dto";

export const createUser = async (user: UserDto) => {

    const { email, username, password } = user;

    if (await User.findOne({ email })) return {error: true, message: 'Email already in use!'};
    if (await User.findOne({ username })) return {error: true, message: 'Username already in use!'};

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ ...user, password: hash });

    await newUser.save();
};

export const signinUser = async (user: UserDto) => {

    const { username, password } = user;

    const userAccount = await User.findOne({ username });
    if (!userAccount) return { accountError: true, message: 'User not found!' };

    const isCorrect = await bcrypt.compare(password, userAccount.password);
    if (!isCorrect) return { passwordError: true, message: 'Incorrect password' };

    const token = jwt.sign({ id: userAccount._id })
};
