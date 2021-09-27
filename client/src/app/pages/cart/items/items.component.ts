import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  eventName = 'CU - Alumni Weekend';
  constructor() { }

  ngOnInit(): void {
  }

  onBack(): void {}
}
