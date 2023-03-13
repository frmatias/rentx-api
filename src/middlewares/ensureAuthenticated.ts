import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}
export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }
    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(
            token,
            "e572913f02542e057f17daf954d81f98"
        ) as IPayload;
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);
        if (!user) {
            throw new AppError("User not found", 401);
        }
        request.user = {
            id: user_id,
        };
        next();
    } catch (e) {
        throw new AppError("Invalid tokem", 401);
    }
}
