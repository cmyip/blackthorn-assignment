import {ComponentFactory, ComponentFactoryResolver} from '@angular/core';
import {AttendeeDetailsComponent} from "@approot/pages/events/shared/attendee-details/attendee-details.component";
import {AttendeesDto} from "@approot/shared/services/dtos/attendees.dto";
import {AttendeeTypeEnum} from "@approot/shared/services/enums/attendee.type.enum";
import {VipDetailsComponent} from "@approot/pages/events/shared/attendee-details/vip-details/vip-details.component";

export class AttendeeFormFactory {
  static GetComponentByItemType(resolver: ComponentFactoryResolver, attendeeEntity: AttendeesDto): ComponentFactory<AttendeeDetailsComponent> {
    switch (attendeeEntity.attendeeType) {
      case AttendeeTypeEnum.VipAttendee:
        return resolver.resolveComponentFactory(VipDetailsComponent);
      default:
        return resolver.resolveComponentFactory(AttendeeDetailsComponent);
    }
  }
}
