import { Component, OnInit } from '@angular/core';
import {EventsService} from "@approot/shared/services/events.service";
import {EventDto} from "@approot/shared/services/dtos/event.dto";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  eventList$: Observable<EventDto[]>;
  eventLoadComplete$: Observable<boolean>;
  constructor(private eventService: EventsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventList$ = this.eventService.eventList$.asObservable();
    this.eventLoadComplete$ = this.eventService.eventLoadComplete.asObservable();
    this.eventService.refreshEvents();
  }

  onEventClick(eventInfo): void {
    this.router.navigate(['../checkout', eventInfo.id], { relativeTo: this.route });
  }
}
