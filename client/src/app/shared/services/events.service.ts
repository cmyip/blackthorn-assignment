import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {EventDto} from "@approot/shared/services/dtos/event.dto";
import {EventServiceProxy} from "@approot/shared/services/service-proxies/event.service-proxy";

@Injectable({
  providedIn: "root"
})
export class EventsService {
  eventList$ = new BehaviorSubject<EventDto[]>([]);
  eventLoadComplete = new BehaviorSubject<boolean>(false);
  eventLoadSuccess = new BehaviorSubject<boolean>(false);

  constructor(private eventProxy: EventServiceProxy) {
  }

  async refreshEvents(): Promise<void> {
    this.eventLoadComplete.next(false);
    try {
      const events = await this.eventProxy.getEvents();
      this.eventList$.next(events);
      this.eventLoadComplete.next(true);
      this.eventLoadSuccess.next(true);
    } catch (exception) {
      this.eventLoadComplete.next(true);
      this.eventLoadSuccess.next(false);
    }
  }

  getEventById(eventId): Promise<EventDto> {
    return this.eventProxy.getEventById(eventId);
  }
}
