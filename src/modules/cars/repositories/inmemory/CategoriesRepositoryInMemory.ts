import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    categories: Category[] = [];

    create({ description, name }: ICreateCategoryDTO): Promise<void> {
        return Promise.resolve(undefined);
    }
    list(): Promise<Category[]> {
        return Promise.resolve([]);
    }
    findByName(name: string): Promise<Category> {
        return Promise.resolve(undefined);
    }
}
