import "reflect-metadata";
import bodyParser from "body-parser";
import { InversifyExpressServer } from "inversify-express-utils";
// Controllers (route handlers)
import { createConnection } from "typeorm";
import "./controllers/product.controller";
import "./controllers/cart.controller";
import "./controllers/attendee.controller";
import "./controllers/event.controller";
import container from "./ioc-config/config";
import bindRepositories from "./ioc-config/repositories.bind";
import { corsMiddleware } from "./middlewares/cors";
import logger from "./utils/logger";
import CONFIG from "./config";

async function createApp() {
    await createConnection();
    await bindRepositories(container);
    // await bindMiddlewares(container);

    const baseApi = CONFIG.BASE_API;
    const server = new InversifyExpressServer(
        container, null, {rootPath: `${baseApi}`}
    );

    server.setConfig((app) => {
        logger.info("database connection created");
        // Express configuration
        app.use(bodyParser.json());
        app.use(corsMiddleware);
        app.use(bodyParser.urlencoded({extended: true}));
    });
    return server.build();
}

export default createApp;
