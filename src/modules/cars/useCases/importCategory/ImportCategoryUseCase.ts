// eslint-disable-next-line import/no-extraneous-dependencies
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { ImportCategoryService } from "../../services/importCategoryService/ImportCategoryService";

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    async execute(file: Express.Multer.File): Promise<void> {
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
