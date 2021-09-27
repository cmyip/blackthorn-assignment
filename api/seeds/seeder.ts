import container from "../src/ioc-config/config";
import {UserSeed} from "./user.seed";
import {interfaces} from "inversify";
import {SEEDER_TYPES} from "../src/ioc-config/types";
import bindRepositories from "../src/ioc-config/repositories.bind";
import { createConnection } from "typeorm";

export class Seeder {
    public async configure() {
        await createConnection();
        this.bindSeeders();
        await bindRepositories(container);
    }

    public async seedAll() {
        const userSeeder = container.get<UserSeed>(SEEDER_TYPES.UserSeeder);
        await userSeeder.run();
    }

    private bindSeeders() {
        container.bind<UserSeed>(SEEDER_TYPES.UserSeeder).to(UserSeed).inSingletonScope();
    }
}
