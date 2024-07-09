import { UUIDVo } from '../../common/value-objects/uuid.vo';
import { Entity } from '../../common/entities';
import { UserStatus, StatusVo } from '../value-objects/status.vo';
import { UserStatusUpdatedEvent } from '../../../events/user-status-updated.event';

interface UserStatusModel {
  id: UUIDVo;
  status: StatusVo;
}

export class UserStatusEntity extends Entity<UserStatusModel> {
  get value() {
    return this.model.status.value;
  }

  private constructor(model: UserStatusModel) {
    super(model.id.value, model);
  }

  public static create(model: {
    id: string;
    status: UserStatus;
  }): UserStatusEntity {
    const { id, status } = model;

    return new UserStatusEntity({
      id: UUIDVo.create({ value: id }),
      status: StatusVo.create({ value: status }),
    });
  }

  public update(status: UserStatus) {
    const { id: uuidVo } = this.model;

    return new UserStatusUpdatedEvent(uuidVo.value, status);
  }
}
