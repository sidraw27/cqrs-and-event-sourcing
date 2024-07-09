import { UserVo } from './value-objects/user.vo';
import { AggregateRoot } from '../common/aggregate-root';
import { UUIDVo } from '../common/value-objects/uuid.vo';
import { UserStatusEntity } from './entities/user-status.entity';
import { UserStatus } from './value-objects/status.vo';
import { UserCreatedEvent } from '../../events/user-created.event';
import { UserStatusUpdatedEvent } from '../../events/user-status-updated.event';

interface UserModel {
  id: UUIDVo;
  User: UserVo;
  status: UserStatusEntity;
}

export class UserEntity extends AggregateRoot<UserModel> {
  private constructor(model: UserModel) {
    super(model.id.value, model);
  }

  public static create({
    id,
    User,
    status,
  }: {
    id?: string;
    User: string;
    status: UserStatus;
  }): UserEntity {
    const uuid = UUIDVo.create({ value: id });

    return new UserEntity({
      id: uuid,
      User: UserVo.create({
        id: uuid,
        value: User,
      }),
      status: UserStatusEntity.create({ id: uuid.value, status }),
    });
  }

  public newUser() {
    const { id, User, status } = this.model;

    this.apply(new UserCreatedEvent(id.value, User.value, status.value));
    console.log('User Entity Created!');
  }

  public updateStatus(status: UserStatus) {
    this.apply(this.model.status.update(status));
  }

  private onUpdateUserStatusEvent(event: UserStatusUpdatedEvent) {
    this.model.status = UserStatusEntity.create({
      id: event.id,
      status: event.status,
    });
    console.log('Status Entity Changed!');
  }
}
