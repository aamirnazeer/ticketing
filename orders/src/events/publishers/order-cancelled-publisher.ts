import {
  Subjects,
  Publisher,
  OrderCancelledEvent,
} from '@aamirnazeerbhat/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
