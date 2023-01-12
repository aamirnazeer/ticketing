import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@aamirnazeerbhat/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
