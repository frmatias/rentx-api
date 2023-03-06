import { Response, Request } from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import { container } from "tsyringe";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
        await importCategoryUseCase.execute(file);
        return response.send(201);
    }
}

export { ImportCategoryController };
