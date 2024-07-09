import { IEvent } from '@nestjs/cqrs';
import { UserStatus } from '../domain/user/value-objects/status.vo';

export class UserStatusUpdatedEvent implements IEvent {
  constructor(public readonly id: string, public readonly status: UserStatus) {}
}
