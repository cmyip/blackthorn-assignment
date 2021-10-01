import {inject, injectable} from "inversify";
import {REPOSITORY_TYPES} from "../src/ioc-config/types";
import {ISeeder} from "./i.seeder";
import {ProductTypeConstants} from "events-domain/constants/catalog-item-type.constants";
import {IProductRepository} from "../src/repositories/i.product.repository";

@injectable()
export class ProductSeed implements ISeeder {
    defaultProducts = [
        {
            id: 1,
            isActive: true,
            title: "Free Ticket",
            description: "Free ticket for anyone to make a valuable contribution towards our future online events programme. Thank You",
            itemType: ProductTypeConstants.FreeTicket,
            numberAvailable: 3,
            price: 0,
            salesEndDate: new Date("2022-07-01")
        },
        {
            id: 2,
            isActive: true,
            title: "Alumni VIP Ticket",
            description: "This livestream will broadcast via a private YouTube link that will be sent to ticket purchasers an hour prior to showtime",
            itemType: ProductTypeConstants.AlumniTicket,
            numberAvailable: 4,
            price: 3500,
            salesEndDate: new Date("2021-10-05")
        },
        {
            id: 3,
            isActive: true,
            title: "Donate",
            description: "Access to arts is vital. Pay what you can.",
            itemType: ProductTypeConstants.Donation,
        },
        {
            id: 4,
            isActive: true,
            title: "Book: Good Strategy - Bad Strategy",
            description: "Learn from the experts of business process management",
            itemType: ProductTypeConstants.Book,
            price: 17.99,
            imgUrl: "/assets/images/book-sample.png"
        }
    ];

    @inject(REPOSITORY_TYPES.IProductRepository)
    private readonly productRepository: IProductRepository;

    async run() {
        this.defaultProducts.forEach((product) => {
            this.productRepository.create(product);
        });
    }

}
