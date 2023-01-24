import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@aamirnazeerbhat/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
