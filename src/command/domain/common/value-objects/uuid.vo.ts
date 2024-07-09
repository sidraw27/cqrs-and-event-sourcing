import { ValueObject } from './base.vo';

interface UUIDProps {
  value: string;
}

export class UUIDVo extends ValueObject<UUIDProps> {
  private constructor(props: UUIDProps) {
    super(props);
  }

  public static create({ value }: UUIDProps): UUIDVo {
    let uuid: string;

    // Todo: recognize value is uuid or not
    if (value) uuid = value;
    else uuid = crypto.randomUUID();

    return new UUIDVo({ value: uuid });
  }
}
