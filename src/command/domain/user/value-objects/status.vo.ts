import { ValueObject } from '../../common/value-objects';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

interface StatusProps {
  value: UserStatus;
}

export class StatusVo extends ValueObject<StatusProps> {
  private constructor(props: StatusProps) {
    super(props);
  }

  public static create({ value }: StatusProps): StatusVo {
    return new StatusVo({ value });
  }
}
