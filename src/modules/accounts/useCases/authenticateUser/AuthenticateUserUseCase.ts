// eslint-disable-next-line import/no-extraneous-dependencies
import { compare } from "bcryptjs";
// eslint-disable-next-line import/no-extraneous-dependencies
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../errors/AppError";

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Email or password not found");
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw new AppError("Email or password not found");
        }
        const token = sign({}, "e572913f02542e057f17daf954d81f98", {
            subject: user.id,
            expiresIn: "1d",
        });
        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
        };
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
