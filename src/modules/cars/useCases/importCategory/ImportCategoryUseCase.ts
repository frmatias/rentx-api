import "reflect-metadata";
// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { ImportCategoryService } from "../../services/importCategoryService/ImportCategoryService";

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute(file: Express.Multer.File): Promise<void> {
        // eslint-disable-next-line prettier/prettier
        const importCategoryService = new ImportCategoryService();
        const categories = await importCategoryService.loadCategories(file);
        // eslint-disable-next-line array-callback-return
        categories.map((category) => {
            const { name, description } = category;
            const existCategory = this.categoriesRepository.findByName(name);
            if (!existCategory) {
                this.categoriesRepository.create({ name, description });
            }
        });
    }
}

export { ImportCategoryUseCase };
