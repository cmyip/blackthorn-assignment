
export const REPOSITORY_TYPES = {
    IProductRepository: Symbol.for("IProductRepository"),
    ICartRepository: Symbol.for("ICartRepository"),
    ICartItemRepository: Symbol.for("ICartItemRepository"),
    IAttendantRepository: Symbol.for("IAttendantRepository"),
    ICartManagerService: Symbol.for("ICartManagerService"),
    ProductEntity: Symbol.for("Repository<ProductEntity>"),
    CartEntity: Symbol.for("Repository<CartEntity>"),
    CartItemEntity: Symbol.for("Repository<CartItemEntity>"),
    AttendantEntity: Symbol.for("Repository<AttendantEntity>"),
};

export const MIDDLEWARE_TYPES = {
    AuthenticatedMiddleware: Symbol.for("AuthenticatedMiddleware"),
    RequiredMiddleware: Symbol.for("RequiredMiddleware")
};

export const SEEDER_TYPES = {
    UserSeeder: Symbol.for("UserSeeder"),
    ProductSeeder: Symbol.for("ProductSeeder"),
};
