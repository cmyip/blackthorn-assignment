import winston from "winston";
import CONFIG from "../config";

const options: winston.LoggerOptions = {
    transports: [
        new winston.transports.Console({
            level: CONFIG.NODE_ENV === "production" ? "error" : "debug"
        }),
        new winston.transports.File({ filename: "debug.log", level: "debug" })
    ]
};

const logger = winston.createLogger(options);

if (CONFIG.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;
