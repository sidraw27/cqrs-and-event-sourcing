import { Injectable } from '@nestjs/common';
import { ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { UserStatus } from '../domain/User/value-objects/status.vo';
import { UserCreatedEvent } from '../events/user-created.event';

@Injectable()
export class UserSaga {
  @Saga()
  UserCreated<T>(events$: Observable<T>): Observable<void> {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map((event) => {
        if (event.status === UserStatus.Inactive) {
          console.log('User Created Saga');
          // return new SendRegisterMailCommand();
        }
      }),
    );
  }
}
