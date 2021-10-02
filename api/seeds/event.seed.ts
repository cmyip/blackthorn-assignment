import {inject, injectable} from "inversify";
import {REPOSITORY_TYPES} from "../src/ioc-config/types";
import {ISeeder} from "./i.seeder";
import {EventEntity, EventStatus} from "../src/entities/event.entity";
import {Repository} from "typeorm";

@injectable()
export class EventSeed implements ISeeder {
    defaultEvents = [
        {
            id: 1,
            status: EventStatus.Open,
            title: "CU - Alumni Weekend",
            description: "<p> Eventful event ahead </p>",
            startDate: new Date(),
            endDate: new Date(),
            bannerImageUrl: "/assets/images/event-1-banner.png"
        }
    ];

    @inject(REPOSITORY_TYPES.EventEntity)
    private readonly eventRepository: Repository<EventEntity>;

    async run() {
        this.defaultEvents.forEach(async (product) => {
            const entity = this.eventRepository.create(product);
            entity.save();
        });
    }
}
