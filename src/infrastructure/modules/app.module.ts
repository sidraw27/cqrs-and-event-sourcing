import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import * as useCases from '../../command/use-cases';
import * as commandHandlers from '../../command/handlers/command';
import * as eventHandlers from '../../command/handlers/event';
import { EventStoreService } from '../../command/services';
import { UserSaga } from '../../command/sagas/user.saga';
import { UserCommandController } from '../../command/adapter/controllers/user-command.controller';
import { UserQueryController } from '../../query/adapter/controllers/user-query.controller';

@Module({
  imports: [CqrsModule],
  controllers: [UserCommandController, UserQueryController],
  providers: [
    EventStoreService,
    ...Object.values(useCases),
    ...Object.values(commandHandlers),
    ...Object.values(eventHandlers),
    UserSaga,
  ],
})
export class AppModule {}
