import { Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import RequestCustom from "request";
import { HTTP_CODE, MESSAGE } from "../constants";
import { MIDDLEWARE_TYPES, REPOSITORY_TYPES } from "../ioc-config/types";
import { IProductRepository } from "../repositories";
import ApiResponse from "../utils/apiResponse";


@controller("/products")
export class ProductController {
    @inject(REPOSITORY_TYPES.IProductRepository) private readonly productRepository: IProductRepository;

    @httpGet("")
    private async getAll(@request() req: RequestCustom, @response() res: Response) {
        try {
            const products = await this.productRepository.getActiveProducts(new Date());
            return ApiResponse.success(res, products, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }
}
