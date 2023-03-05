import "reflect-metadata";
// eslint-disable-next-line import/no-extraneous-dependencies
import { container } from "tsyringe";
import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listCategoryUseCase = container.resolve(ListCategoriesUseCase);
        const all = await listCategoryUseCase.execute();
        return response.json(all);
    }
}

export { ListCategoriesController };
