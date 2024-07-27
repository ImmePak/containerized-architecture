import { Observable } from 'rxjs';
import { IUser } from './user.interface';

export interface IUserService {
  getUser(id: string): Observable<IUser>;
  setDepartment(user: IUser, department: string): Observable<IUser>;
}
