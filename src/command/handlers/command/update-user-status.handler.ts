import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from '../../domain/User/User.entity';
import { EventStoreService } from '../../services';
import { UserRepository } from '../../../infrastructure/repositories/user.repository';
import { UpdateUserStatusCommand } from '../../commands/update-user-status.command';

@CommandHandler(UpdateUserStatusCommand)
export class UpdateUserStatusHandler
  implements ICommandHandler<UpdateUserStatusCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async execute(command: UpdateUserStatusCommand): Promise<void> {
    const User = new UserRepository().findById(command.id);

    const UserAggregate = this.publisher.mergeObjectContext<UserEntity>(
      UserEntity.create({ ...User, status: command.status }),
    );

    UserAggregate.updateStatus(command.status);

    await this.eventStoreService.save(UserAggregate.id, 'updateUserStatus', {
      id: UserAggregate.id,
      status: UserAggregate.model.status.value,
    });

    UserAggregate.commit();
  }
}
