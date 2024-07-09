import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserStatusUpdatedEvent } from '../../events/user-status-updated.event';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';

@EventsHandler(UserStatusUpdatedEvent)
export class UserStatusUpdatedHandler implements IEventHandler {
  handle(event: UserStatusUpdatedEvent) {
    new UserRepository().update(event.id, event.status);
    console.log('Status Change Saved!');
  }
}
