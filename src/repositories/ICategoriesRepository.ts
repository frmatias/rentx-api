import { Category } from "../model/Category";

interface ICreateCategoryDTO {
    description: string;
    name: string;
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create({ description, name }: ICreateCategoryDTO): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
