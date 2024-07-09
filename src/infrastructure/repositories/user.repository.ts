import { UserStatus } from '../../command/domain/user/value-objects/status.vo';

interface User {
  id: string;
  User: string;
  status: UserStatus;
}

const Users: User[] = [];

export class UserRepository {
  save(User: User) {
    Users.push(User);
  }

  update(id: string, status: UserStatus) {
    const index = Users.findIndex((User) => User.id === id);
    Users[index] = { ...Users[index], status };
  }

  findById(id: string) {
    return Users.find((User) => User.id === id);
  }

  findAll() {
    return Users;
  }
}
