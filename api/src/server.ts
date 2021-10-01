// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
dotenv.config();

import CONFIG from "./config";
import createApp from "./app";

import logger from "./utils/logger";
createApp().then((app) => {
    app.listen(CONFIG.PORT, () => {
        logger.info(`Server running at http://localhost:${CONFIG.PORT}`);
    });
});

