import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base.use-case';
import { CreateUserDto } from '../../adapter/dto/input';
import { CreateUserCommand } from '../../commands/create-user.command';

// sanitize, validation, normalize, exception, etc.
@Injectable()
export class CreateUserUseCase extends BaseUseCase<CreateUserDto, any> {
  async execute({ id, User, status }: CreateUserDto) {
    await this.commandBus.execute(new CreateUserCommand(id, User, status));
  }
}
