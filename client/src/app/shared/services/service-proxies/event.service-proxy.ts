import {Injectable} from "@angular/core";
import {BaseService} from "@approot/shared/services";
import {EventDto} from "@approot/shared/services/dtos/event.dto";

@Injectable({
  providedIn: 'root'
})
export class EventServiceProxy {
  constructor(private baseService: BaseService) { }

  getEvents(): Promise<EventDto[]> {
    return this.baseService.get('/events').toPromise();
  }

  getEventById(eventId): Promise<EventDto> {
    return this.baseService.get(`/events/${eventId}`).toPromise();
  }
}
