import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@aamirnazeerbhat/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
