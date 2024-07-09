import { IntersectionType, PickType } from '@nestjs/swagger';
import { UserStatus } from '../../../../domain/User/value-objects/status.vo';
import { UserModel } from '../../../../../infrastructure/models/user.model';

export class UpdateUserStatusDto extends IntersectionType(
  PickType(UserModel, ['id']),
) {
  status: UserStatus;
}
