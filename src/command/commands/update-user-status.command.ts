import { ICommand } from '@nestjs/cqrs';
import { UserStatus } from '../domain/user/value-objects/status.vo';

export class UpdateUserStatusCommand implements ICommand {
  constructor(public readonly id: string, public readonly status: UserStatus) {}
}
