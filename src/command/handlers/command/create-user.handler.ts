import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from '../../domain/User/User.entity';
import { EventStoreService } from '../../services';
import { CreateUserCommand } from '../../commands/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventStoreService: EventStoreService,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const UserAggregate = this.publisher.mergeObjectContext<UserEntity>(
      UserEntity.create(command),
    );
    const {
      model: { User, status },
    } = UserAggregate;

    UserAggregate.newUser();

    await this.eventStoreService.save(UserAggregate.id, 'createUser', {
      id: UserAggregate.id,
      User: User.value,
      status: status.value,
    });

    UserAggregate.commit();
  }
}
