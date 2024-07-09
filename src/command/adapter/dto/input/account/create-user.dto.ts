import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { UserStatus } from '../../../../domain/User/value-objects/status.vo';
import { UserModel } from '../../../../../infrastructure/models/user.model';

export class CreateUserDto extends IntersectionType(
  PickType(PartialType(UserModel), ['id']),
  PickType(UserModel, ['User']),
) {
  status: UserStatus;
}
