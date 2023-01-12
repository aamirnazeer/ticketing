import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@aamirnazeerbhat/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
