import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const properties = ['user', 'email', 'password'];

interface User {
    user: string;

    email: string;

    password: string;

    img: string;

    subscribers: number;

    subscribedUsers: [string];
}

function validateProperties(user: User): [boolean, string | null] {
    for (let i = 0; i < properties.length; i += 1) {
        if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
            return [false, properties[i]];
        };
    };

    return [true, null];
};

function validationUser(req: Request, res: Response, next: NextFunction) {
    const user: User = req.body;

    let [valid, property] = validateProperties(user);

    if (!valid) {
        return res.status(StatusCodes.BAD_REQUEST).send(`O campo ${property} é obrigatório.`);
    }

    // [valid, property] = validateValues(user);

    // if (!valid) {
    //     return res.status(StatusCodes.BAD_REQUEST).send(`O campo ${property} não pode ser nulo ou vazio.`);
    // }

    next();
};

export default validationUser;
