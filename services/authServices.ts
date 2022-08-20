import User from "../models/User";
import bcrypt from "bcryptjs";
import UserDto from "../dtos/User.dto";

const createUser = async (user: UserDto) => {

    const { password } = user;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ ...user, password: hash });

    await newUser.save();
};

export default createUser;
