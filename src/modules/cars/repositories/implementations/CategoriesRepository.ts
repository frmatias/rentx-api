import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;
    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.repository = getRepository(Category);
    }

    public static getInstance(): CategoriesRepository {
        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
    }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });
        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
       const categories = await this.repository.find();
       return categories;
    }
    findByName(name: string): Category {
        const category = this.categories.find((c) => c.name === name);
        return category;
    }
}

export { CategoriesRepository };
