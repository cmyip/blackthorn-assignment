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
import {CartStatusConstants} from "../../../domain/constants/cart-status.constants";


@controller("/carts")
export class CartController {
    @inject(REPOSITORY_TYPES.ICartManagerService) private readonly cartManager: ICartManagerService;

    @httpGet("/:uuid")
    private async getByCode(@request() req: RequestCustom, @response() res: Response) {
        try {
            const {params} = req;
            const {uuid} = params;
            const cartItem = await this.cartManager.getCartByCode(uuid);
            return ApiResponse.success(res, this.mapToDto(cartItem), HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }

    @httpPut("/:code")
    private async updateCartByCode(@request() req: RequestCustom, @response() res: Response) {
        try {
            const { params, body } = req;
            const { code } = params;
            const { itemList } = body;
            if (!Array.isArray(itemList)) {
                return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.REQUEST.BAD_REQUEST);
            }
            const cartItem = await this.cartManager.getCartByCode(code);
            const resultingCart = await this.cartManager.updateCart(cartItem.id, itemList);
            return ApiResponse.success(res, this.mapToDto(resultingCart), HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }

    @httpPost("/:code/checkout")
    private async checkoutCart(@request() req: RequestCustom, @response() res: Response) {
        try {
            const { params } = req;
            const { code } = params;
            const cartItem = await this.cartManager.getCartByCode(code);
            const resultingCart = await this.cartManager.updateCartStatus(cartItem, CartStatusConstants.CHECKED_OUT);
            return ApiResponse.success(res, this.mapToDto(resultingCart), HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }

    @httpPost("")
    private async createCart(@request() req: RequestCustom, @response() res: Response) {
        try {
            const newCart = await this.cartManager.createCart();
            return ApiResponse.success(res, this.mapToDto(newCart), HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }

    private mapToDto(cartEntity: CartEntity) {
        const cartVm = {
            cartCode: cartEntity.cartCode,
            promoCode: cartEntity.promoCode,
            subtotalAmount: cartEntity.subTotal,
            taxAmount: cartEntity.tax,
            totalAmount: cartEntity.totalCost,
            cartStatus: cartEntity.cartStatus,
            cartItems: cartEntity.items.map(item => ({
                productId: item.product.id,
                itemTitle: item.product.title,
                quantity: item.quantity,
                amount: item.donationAmount,
                isWaitlist: item.isWaitList
            }))
        };
        return cartVm;
    }
}
