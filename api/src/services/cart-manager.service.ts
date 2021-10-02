import {ICartManagerService} from "./i.cart-manager.service";
import {ProductOrderDto} from "../dto/productOrder.dto";
import {CartEntity} from "../entities/cart.entity";
import {inject, injectable} from "inversify";
import {REPOSITORY_TYPES} from "../ioc-config/types";
import {EntityNotFoundError, Repository} from "typeorm";
import {CartItemEntity} from "../entities/cart-item.entity";
import {ICartRepository} from "../repositories/i.cart.repository";
import {IProductRepository} from "../repositories";
import {v4 as uuidv4} from "uuid";
import {ProductTypeConstants} from "../constants/catalog-item-type.constants";
import {IAttendeeRepository} from "../repositories/i.attendee.repository";
import {AttendeeEntity, AttendeeType} from "../entities/attendees.entity";
import {AttendeeUpdateDto} from "../dto/attendee-update.dto";
import {CartStatusConstants} from "../../../domain/constants/cart-status.constants";

@injectable()
export class CartManagerService implements ICartManagerService{
    constructor(
        @inject(REPOSITORY_TYPES.ICartRepository) private cartRepository: ICartRepository,
        @inject(REPOSITORY_TYPES.CartItemEntity) private cartItemRepository: Repository<CartItemEntity>,
        @inject(REPOSITORY_TYPES.IProductRepository) private productRepository: IProductRepository,
        @inject(REPOSITORY_TYPES.IAttendeeRepository) private attendeeRepository: IAttendeeRepository,
    ) {
    }

    async createCart(): Promise<CartEntity> {
        // generate cart code, browser to keep track of cart using cart code
        const cartCode = uuidv4().toString();
        const newCart = new CartEntity();
        newCart.cartCode = cartCode;
        newCart.items = [];
        await this.cartRepository.create(newCart);
        return newCart;
    }

    getCartByCode(cartCode: string): Promise<CartEntity> {
        return new Promise(async (resolve, reject) => {
            const cart = await this.cartRepository.getCartByCode(cartCode);
            if (!cart) {
                resolve(null);
            }
            this.calculateCartItems(cart);
            resolve(cart);
        });
    }

    async updateCart(cartId: number, cartItems: ProductOrderDto[]): Promise<CartEntity> {
        const cart = await this.cartRepository.getById(cartId);
        if (!cart) {
            throw new EntityNotFoundError(CartEntity, `Cart with ID ${cartId} does not exist`);
        }

        const items = await Promise.all(cartItems.map(async (item) => {
            const product = await this.productRepository.getById(item.productId);
            return Object.assign(new CartItemEntity(), {
                product,
                cart,
                quantity: item.quantity,
                donationAmount: item.donationAmount
            });
        }));

        return this.updateCartByItems(cart, items);
    }

    async updateCartByItems(cart: CartEntity, items: CartItemEntity[]): Promise<CartEntity> {
        for (const existingItem of cart.items) {
            await this.cartItemRepository.delete(existingItem);
        }
        for (const newItem of items) {
            await newItem.save();
        }
        cart.items = [...items];
        this.calculateCartItems(cart);
        await cart.save();
        // await this.cartRepository.update(cart.id, cart);
        return cart;
    }

    private calculateCartItems(cart: CartEntity) {
        let cartTotal = 0;
        for (const item of cart.items) {
            if (item.product && item.product.itemType == ProductTypeConstants.Donation) {
                cartTotal += Number(item.donationAmount);
                continue;
            }
            const subtotal = Number(item.quantity) * Number(item.product.price);
            item.donationAmount = subtotal;
            cartTotal += Number(subtotal);
        }
        cart.tax = cartTotal * this.getTaxRate();
        cart.subTotal = cartTotal;
        cart.totalCost = cart.tax + cart.subTotal;
        return cart;
    }

    async generateAttendees(cart: CartEntity): Promise<AttendeeEntity[]> {
        const freeTicketItem = cart.items.find(item => item.product.itemType == ProductTypeConstants.FreeTicket);
        const alumniTicketItem = cart.items.find(item => item.product.itemType == ProductTypeConstants.AlumniTicket);
        const cartAttendees = await this.attendeeRepository.getAttendeesByCart(cart);
        let freeAttendees = cartAttendees.filter(c => c.attendeeType == AttendeeType.FREE_TICKET);
        let alumniAttendees = cartAttendees.filter(c => c.attendeeType == AttendeeType.VIP_TICKET);
        let resultingTickets: AttendeeEntity[] = [];
        if (freeTicketItem && freeTicketItem.quantity) {
            freeAttendees = await this.syncTicketItems(cart, freeAttendees, freeTicketItem.quantity, AttendeeType.FREE_TICKET);
            resultingTickets = resultingTickets.concat(freeAttendees);
        }
        if (alumniTicketItem && alumniTicketItem.quantity) {
            alumniAttendees = await this.syncTicketItems(cart, alumniAttendees, alumniTicketItem.quantity, AttendeeType.VIP_TICKET);
            resultingTickets = resultingTickets.concat(alumniAttendees);
        }
        return resultingTickets;
    }

    async syncTicketItems(cart: CartEntity, tickets: AttendeeEntity[], itemCount: number, attendeeType: AttendeeType) {
        if (tickets.length == itemCount) {
            return tickets;
        }
        // cart has more items than attendees
        if (tickets.length > itemCount) {
            const ticketsToRemove = tickets.slice(itemCount, tickets.length);
            for (const ticket of ticketsToRemove) {
                await ticket.remove();
            }
            tickets.length = itemCount;
            return tickets;
        }
        // insert newly added attendees
        if (tickets.length < itemCount) {
            const numberOfTicketsToAdd = itemCount - tickets.length;
            for (let count = 0; count < numberOfTicketsToAdd; count++) {
                const newTicket = new AttendeeEntity();
                newTicket.cartId = cart.id;
                newTicket.attendeeType = attendeeType;
                await newTicket.save();
                tickets.push(newTicket);
            }
            return tickets;
        }
    }


    getTaxRate() {
        return 0.10;
    }

    async updateAttendees(cart: CartEntity, attendeeUpdates: AttendeeUpdateDto[]): Promise<AttendeeEntity[]> {
        const attendees = await this.generateAttendees(cart);
        for (const attendeeToUpdate of attendeeUpdates) {
            const sanitizedAttendee = await this.validateAttendee(attendees, attendeeToUpdate);
            const attendeeEntity = attendees.find(a => a.id == attendeeToUpdate.id);
            Object.assign(attendeeEntity, sanitizedAttendee);
            await attendeeEntity.save();
        }
        return Promise.resolve(attendees);
    }

    async validateAttendees(cart: CartEntity, attendeeUpdates: AttendeeUpdateDto[]): Promise<boolean> {
        const attendees = await this.generateAttendees(cart);
        for (const attendeeToUpdate of attendeeUpdates) {
            this.validateAttendee(attendees, attendeeToUpdate);
        }
        return true;
    }

    private validateAttendee(attendees: AttendeeEntity[], attendeeUpdate: AttendeeUpdateDto): AttendeeUpdateDto {
        const attendeeEntity: AttendeeEntity = attendees.find(a => a.id == attendeeUpdate.id);
        if (!attendeeEntity) {
            throw new EntityNotFoundError(AttendeeEntity, "Attendee not found");
        }
        let validated: boolean;
        let outcome: AttendeeUpdateDto | string[];
        if (attendeeEntity.attendeeType == AttendeeType.FREE_TICKET) {
            [validated, outcome] = this.validateFreeTicketRequirements(attendeeUpdate);
        }
        if (attendeeEntity.attendeeType == AttendeeType.VIP_TICKET) {
            [validated, outcome] = this.validateVipTicketRequirements(attendeeUpdate);
        }
        if (!validated) {
            const requiredFields: string[] = <string[]>outcome;
            throw new Error(`Missing required field: ${requiredFields.join(",")}`);
        }
        return <AttendeeUpdateDto>outcome;
    }

    private validateFreeTicketRequirements(attendeeUpdate: AttendeeUpdateDto): [boolean, AttendeeUpdateDto | string[]] {
        const requiredFields = [
            "firstName",
            "lastName",
            "email"
        ];

        return this.validateInput(attendeeUpdate, requiredFields);
    }

    private validateVipTicketRequirements(attendeeUpdate: AttendeeUpdateDto): [boolean, AttendeeUpdateDto | string[]] {
        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "jobTitle",
            "country",
            "company"
        ];

        return this.validateInput(attendeeUpdate, requiredFields);
    }

    private validateInput(updateDto: any, requiredFields: string[]): [boolean, any | string[]] {
        const errors = [];
        const sanitizedObject: any = {};
        for (const field of requiredFields) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (!updateDto[field]) {
                errors.push(field);
                continue;
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            sanitizedObject[field] = updateDto[field];
        }
        if (errors.length > 0) {
            return [false, errors];
        }
        return [true, sanitizedObject];
    }

    async updateCartStatus(cart: CartEntity, cartStatus: CartStatusConstants): Promise<CartEntity> {
        cart.cartStatus = cartStatus;
        await cart.save();
        return cart;
    }
}
