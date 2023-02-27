// eslint-disable-next-line import/no-extraneous-dependencies
import { parse as csvParse } from "csv-parse";
import fs from "fs";

import { ICreateCategoryDTO } from "../../repositories/ICategoriesRepository";
import { IImportCategoryService } from "../IImportCategoryService";

class ImportCategoryService implements IImportCategoryService {
    loadCategories(file: Express.Multer.File): Promise<ICreateCategoryDTO[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);

            const parseFile = csvParse();

            const categories: ICreateCategoryDTO[] = [];

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({ name, description });
                })
                .on("end", () => resolve(categories))
                .on("error", (err) => reject(err));
        });
    }
}

export { ImportCategoryService };
