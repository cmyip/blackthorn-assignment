import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AttendeesDto} from "@approot/shared/services/dtos/attendees.dto";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";

@Component({
  selector: 'app-attendee-details',
  templateUrl: './attendee-details.component.html',
  styleUrls: ['./attendee-details.component.scss']
})
export class AttendeeDetailsComponent implements OnInit {
  @Input() attendeeDto: AttendeesDto;
  @Input() attendeeNumber: number;
  @Output() formReady = new Subject();
  public attendeeForm: FormGroup;
  constructor(protected fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.attendeeForm = this.fb.group({
      firstName: new FormControl(this.attendeeDto.firstName, [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl(this.attendeeDto.lastName, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(this.attendeeDto.email, [Validators.required, Validators.minLength(2)]),
      receiveCommunications: new FormControl(this.attendeeDto.receiveCommunications, []),
    });
    this.formReady.next(this.attendeeForm);
  }

}
