import { InjectionToken } from '@angular/core';
import { UserService } from './user.service';
import { IUserService } from './user.service.interface';

export const USER_SERVICE = new InjectionToken<IUserService>('USER_SERVICE', {
  providedIn: 'root',
  factory: () => new UserService(),
});
