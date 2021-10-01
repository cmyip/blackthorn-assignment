import container from "../src/ioc-config/config";
import {SEEDER_TYPES} from "../src/ioc-config/types";
import bindRepositories from "../src/ioc-config/repositories.bind";
import { createConnection } from "typeorm";
import {ProductSeed} from "./product.seed";

export class Seeder {
    public async configure() {
        await createConnection();
        this.bindSeeders();
        await bindRepositories(container);
    }

    public async seedAll() {
        const productSeeder = container.get<ProductSeed>(SEEDER_TYPES.ProductSeeder);
        await productSeeder.run();
    }

    private bindSeeders() {
        container.bind<ProductSeed>(SEEDER_TYPES.ProductSeeder).to(ProductSeed).inSingletonScope();
    }
}
