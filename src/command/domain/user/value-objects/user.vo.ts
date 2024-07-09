import { ValueObject } from '../../common/value-objects';
import { UUIDVo } from '../../common/value-objects/uuid.vo';

interface UserProps {
  id?: UUIDVo;
  value: string;
}

export class UserVo extends ValueObject<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  public static create({ value: User, id }: UserProps): UserVo {
    let value: string = User;

    if (User.includes('<placeholder>@')) {
      if (!id) throw new Error('id must be a valid uuid');
      value = User.replace('<placeholder>', id.value);
    }

    return new UserVo({ value });
  }
}
