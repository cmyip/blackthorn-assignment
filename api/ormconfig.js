module.exports = {
    type: "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "scout",
    database: process.env.DB_NAME || "test_db",
    charset: "utf8",
    driver: "postgres",
    ssl: false,
    synchronize: process.env.NODE_ENV !== "production",
    entities:[
        "**/**.entity.ts", "**/**.entity.js"
    ],
    logging: "error",
    migrations: ["migration/*.ts"],
    cli: {
        migrationsDir: "migration"
    },
    connectTimeout: 30000,
    acquireTimeout: 30000
};
