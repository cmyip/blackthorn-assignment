import { Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import RequestCustom from "request";
import { HTTP_CODE, MESSAGE } from "../constants";
import { MIDDLEWARE_TYPES, REPOSITORY_TYPES } from "../ioc-config/types";
import { IProductRepository } from "../repositories";
import ApiResponse from "../utils/apiResponse";
import {DtoMapper} from "../utils/dtoMapper";
import {ProductListingDto} from "../dto/productListing.dto";
import {param} from "express-validator";
import {ICartManagerService} from "../services/i.cart-manager.service";
import {CartEntity} from "../entities/cart.entity";
import {AttendeeEntity} from "../entities/attendees.entity";
import {AttendeeUpdateDto} from "../dto/attendee-update.dto";


@controller("/attendees")
export class AttendeeController {
    @inject(REPOSITORY_TYPES.ICartManagerService) private readonly cartManager: ICartManagerService;

    @httpGet("")
    private async getAttendees(@request() req: RequestCustom, @response() res: Response) {
        try {
            const {query} = req;
            const cartCode: string = query.cartCode.toString();
            if (!cartCode) {
                return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.REQUEST.BAD_REQUEST);
            }
            const cart = await this.cartManager.getCartByCode(cartCode);
            if (!cart) {
                return ApiResponse.error(res, null, HTTP_CODE.NOT_FOUND, MESSAGE.ERROR);
            }
            const attendees = await this.cartManager.generateAttendees(cart);
            const attendeesDto = attendees.map(this.mapToDto);
            return ApiResponse.success(res, attendeesDto, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }

    @httpPut("/bulk")
    private async updateAttendees(@request() req: RequestCustom, @response() res: Response) {
        try {
            const {query, body} = req;
            const cartCode: string = query.cartCode.toString();
            if (!cartCode) {
                return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.REQUEST.BAD_REQUEST);
            }
            const cart = await this.cartManager.getCartByCode(cartCode);
            if (!cart) {
                return ApiResponse.error(res, null, HTTP_CODE.NOT_FOUND, MESSAGE.ERROR);
            }
            const { attendees } = body;
            await this.cartManager.validateAttendees(cart, attendees);
            const updatedAttendees = await this.cartManager.updateAttendees(cart, attendees);
            const updatedAttendeesDto = updatedAttendees.map(a => this.mapToDto(a));
            return ApiResponse.success(res, updatedAttendeesDto, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }

    private mapToDto(attendee: AttendeeEntity) {
        const {
            id,
            attendeeType,
            firstName,
            lastName,
            email,
            jobTitle,
            receiveCommunications,
            company,
            country
        } = attendee;
        return {
            id,
            attendeeType,
            firstName,
            lastName,
            email,
            jobTitle,
            receiveCommunications,
            company,
            country
        };
    }
}
