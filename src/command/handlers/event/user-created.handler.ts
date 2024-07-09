import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../../events/user-created.event';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler {
  handle(event: UserCreatedEvent) {
    new UserRepository().save(event);
    console.log('User Saved!');
  }
}
