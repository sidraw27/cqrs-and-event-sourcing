import { Controller, Get, Param, Query } from '@nestjs/common';
import { CreateUserDto } from '../dto/input';
import { CreateUserUseCase, UpdateUserStatusUseCase } from '../../use-cases';
import { UserStatus } from '../../domain/user/value-objects/status.vo';

@Controller('User')
export class UserCommandController {
  constructor(
    private readonly createUseCase: CreateUserUseCase,
    private readonly updateStatusUseCase: UpdateUserStatusUseCase,
  ) {}
  //
  // @Get()
  // read() {
  //   return 'User';
  // }

  // @Post()
  @Get()
  async create(@Query() dto: CreateUserDto) {
    const id = crypto.randomUUID();

    await this.createUseCase.execute({ id, ...dto });

    return { id };
  }

  // @Patch()
  @Get(':id/status')
  async update(
    @Param() { id }: { id: string }, // @Body() { status }: { status: UserStatus },
  ) {
    await this.updateStatusUseCase.execute({
      id,
      status: UserStatus.Active,
    });

    return { id };
  }
}
