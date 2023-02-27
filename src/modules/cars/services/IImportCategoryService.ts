import { ICreateCategoryDTO } from "../repositories/ICategoriesRepository";

interface IImportCategoryService {
    loadCategories(file: Express.Multer.File): Promise<ICreateCategoryDTO[]>;
}

export { IImportCategoryService };
