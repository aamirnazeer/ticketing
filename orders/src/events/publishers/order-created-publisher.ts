import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from '@aamirnazeerbhat/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
