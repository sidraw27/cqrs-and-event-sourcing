import { Injectable } from '@nestjs/common';
import { BaseUseCase } from '../base.use-case';
import { UpdateUserStatusDto } from '../../adapter/dto/input';
import { UpdateUserStatusCommand } from '../../commands/update-user-status.command';

@Injectable()
export class UpdateUserStatusUseCase extends BaseUseCase<
  UpdateUserStatusDto,
  any
> {
  async execute(dto: UpdateUserStatusDto) {
    const { id, status } = dto;
    await this.commandBus.execute(new UpdateUserStatusCommand(id, status));
  }
}
