import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
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
        throw new Error("Token missing");
    }
    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(
            token,
            "e572913f02542e057f17daf954d81f98"
        ) as IPayload;
        const usersRepository = new UsersRepository();
        usersRepository.findById(user_id);
        next();
    } catch (e) {
        throw new Error("Invalid tokem");
    }
}
