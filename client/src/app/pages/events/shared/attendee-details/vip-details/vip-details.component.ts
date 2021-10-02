import { Component, OnInit } from '@angular/core';
import {AttendeeDetailsComponent} from "@approot/pages/events/shared/attendee-details/attendee-details.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-vip-details',
  templateUrl: './vip-details.component.html',
  styleUrls: ['./vip-details.component.scss']
})
export class VipDetailsComponent extends AttendeeDetailsComponent implements OnInit {
  constructor(protected fb: FormBuilder) {
    super(fb);
  }

  ngOnInit(): void {
    this.attendeeForm = this.fb.group({
      firstName: new FormControl(this.attendeeDto.firstName, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(this.attendeeDto.lastName, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(this.attendeeDto.email, [Validators.required, Validators.minLength(2)]),
      jobTitle: new FormControl(this.attendeeDto.jobTitle, [Validators.required, Validators.minLength(2)]),
      company: new FormControl(this.attendeeDto.company, [Validators.required, Validators.minLength(2)]),
      country: new FormControl(this.attendeeDto.country, [Validators.required, Validators.minLength(2)])
    });
    this.formReady.next(this.attendeeForm);
  }

}
