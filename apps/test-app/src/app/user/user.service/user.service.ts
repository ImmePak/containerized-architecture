import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { IUser } from './user.interface';
import { IUserService } from './user.service.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  public getUser(id: string): Observable<IUser> {
    return of({
      name: 'John Doe',
      age: 30,
      id,
      department: 'IT',
    }).pipe(delay(1000));
  }

  public setDepartment(user: IUser, department: string): Observable<IUser> {
    return of({
      ...user,
      department,
    }).pipe(delay(1000));
  }
}
