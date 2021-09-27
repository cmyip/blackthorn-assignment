import { getRepositories } from "../src/ioc-config/db/repository.factory";
import {inject, injectable} from "inversify";
import {REPOSITORY_TYPES} from "../src/ioc-config/types";
import {IUserRepository} from "../src/repositories";
import {ISeeder} from "./i.seeder";

@injectable()
export class UserSeed implements ISeeder {
    @inject(REPOSITORY_TYPES.IUserRepository) private readonly userRepository: IUserRepository;

    async run() {
        await this.userRepository.create({
            email: "admin",
            name: "admin",
            password: "admin",
            isActive: true
        });
    }

}
