import { Request, Response } from "express";
import "reflect-metadata";
// eslint-disable-next-line import/no-extraneous-dependencies
import { container } from "tsyringe";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    handle(request: Request, response: Response) {
        const { name, description } = request.body;
        const createSpecificationUseCase = container.resolve(
            CreateSpecificationUseCase
        );
        createSpecificationUseCase.execute({ name, description });
        return response.status(200).send();
    }
}

export { CreateSpecificationController };
