import {AfterViewInit, Component} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from '@angular/router';
import * as relativeTime from 'dayjs/plugin/relativeTime';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  loading = false;

  constructor(
    private router: Router
  ) {
      this.loading = true;
      dayjs.extend(relativeTime);
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd || event instanceof NavigationCancel
      ) {
        this.loading = false;
      }
    });
  }
}
