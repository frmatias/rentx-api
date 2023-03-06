import "reflect-metadata";
// eslint-disable-next-line import/no-extraneous-dependencies
import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists =
            await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error(`Specification ${name} already exists`);
        }

        this.specificationsRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
