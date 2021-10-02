
export const REPOSITORY_TYPES = {
    IProductRepository: Symbol.for("IProductRepository"),
    ICartRepository: Symbol.for("ICartRepository"),
    ICartItemRepository: Symbol.for("ICartItemRepository"),
    IAttendeeRepository: Symbol.for("IAttendeeRepository"),
    ICartManagerService: Symbol.for("ICartManagerService"),
    IEventRepository: Symbol.for("IEventRepository"),
    ProductEntity: Symbol.for("Repository<ProductEntity>"),
    CartEntity: Symbol.for("Repository<CartEntity>"),
    CartItemEntity: Symbol.for("Repository<CartItemEntity>"),
    AttendeeEntity: Symbol.for("Repository<AttendeeEntity>"),
    EventEntity: Symbol.for("Repository<EventEntity>"),
};

export const MIDDLEWARE_TYPES = {
    AuthenticatedMiddleware: Symbol.for("AuthenticatedMiddleware"),
    RequiredMiddleware: Symbol.for("RequiredMiddleware")
};

export const SEEDER_TYPES = {
    EventSeeder: Symbol.for("EventSeeder"),
    ProductSeeder: Symbol.for("ProductSeeder"),
};
