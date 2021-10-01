
export const REPOSITORY_TYPES = {
    IProductRepository: Symbol.for("IProductRepository"),
    ProductEntity: Symbol.for("Repository<ProductEntity>")
};

export const MIDDLEWARE_TYPES = {
    AuthenticatedMiddleware: Symbol.for("AuthenticatedMiddleware"),
    RequiredMiddleware: Symbol.for("RequiredMiddleware")
};

export const SEEDER_TYPES = {
    UserSeeder: Symbol.for("UserSeeder"),
    ProductSeeder: Symbol.for("ProductSeeder"),
};
