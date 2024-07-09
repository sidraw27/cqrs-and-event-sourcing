import { IEvent } from '@nestjs/cqrs';
import { UserStatus } from '../domain/user/value-objects/status.vo';

export class UserCreatedEvent implements IEvent {
  constructor(
    public readonly id: string,
    public readonly User: string,
    public readonly status: UserStatus,
  ) {}
}
