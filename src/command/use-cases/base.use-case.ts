import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseUseCase<InputPort, OutputPort> {
  constructor(protected readonly commandBus: CommandBus) {}

  abstract execute(dto: InputPort): OutputPort | Promise<OutputPort>;
}
