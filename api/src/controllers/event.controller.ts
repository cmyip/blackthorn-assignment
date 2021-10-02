import { Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import RequestCustom from "request";
import { HTTP_CODE, MESSAGE } from "../constants";
import {  REPOSITORY_TYPES } from "../ioc-config/types";
import ApiResponse from "../utils/apiResponse";
import {Repository} from "typeorm";
import {EventEntity} from "../entities/event.entity";


@controller("/events")
export class EventController {
    @inject(REPOSITORY_TYPES.EventEntity) private readonly eventRepository: Repository<EventEntity>;

    @httpGet("")
    private async getEvents(@request() req: RequestCustom, @response() res: Response) {
        try {
            const events = await this.eventRepository.find();
            return ApiResponse.success(res, events, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }

    @httpGet("/:eventId")
    private async getById(@request() req: RequestCustom, @response() res: Response) {
        try {
            const { params } = req;
            const { eventId } = params;
            const eventInfo = await this.eventRepository.findOne({ id: Number(eventId) });
            return ApiResponse.success(res, eventInfo, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS);
        } catch (ex) {
            console.log(ex);
            return ApiResponse.error(res, null, HTTP_CODE.ERROR, MESSAGE.ERROR);
        }
    }
}
