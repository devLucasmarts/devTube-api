import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import UserDto from "../dtos/User.dto";

const properties = ['username', 'email', 'password'];

function validateProperties(user: UserDto): [boolean, string | null] {
    for (let i = 0; i < properties.length; i += 1) {
        if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
            return [false, properties[i]];
        };
    };

    return [true, null];
};

function validateValues(user: UserDto): [boolean, string | null] {
    const entries = Object.entries(user);

    for (let i = 0; i < entries.length; i += 1) {
        const [property, value] = entries[i];

        if (!value) {
            return [false, property];
        };
    };

    return [true, null];
};

function validateUserPassword(userPassword: string): [boolean, string | null] {

    const invalidTypePassword = 'A senha deve conter números, letras e/ou caracteres especiais.';

    const invalidPasswordLength = 'A senha deve conter pelo menos oito caracteres';

    if (typeof userPassword !== 'string') {
        return [false, invalidTypePassword]
    };

    if (userPassword.length < 8) {
        return [false, invalidPasswordLength]
    };

    return [true, null];
};

function validationUser(req: Request, res: Response, next: NextFunction) {
    const user: UserDto = req.body;

    let [valid, property] = validateProperties(user);

    let [validPasswor, errorMessage] = validateUserPassword(user.password);

    if (!valid) {
        return res.status(StatusCodes.BAD_REQUEST).send(`O campo ${property} é obrigatório.`);
    };

    [valid, property] = validateValues(user);

    if (!valid) {
        return res.status(StatusCodes.BAD_REQUEST).send(`O campo ${property} não pode ser nulo ou vazio.`);
    };

    [validPasswor, errorMessage] = validateUserPassword(user.password);

    if (!validPasswor) {
        return res.status(StatusCodes.BAD_REQUEST).send(errorMessage);
    }

    next();
};

export default validationUser;
