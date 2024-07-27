import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  age: number;
  department: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public getUser(id: string): Observable<User> {
    return of({
      name: 'John Doe',
      age: 30,
      id,
      department: 'IT',
    }).pipe(delay(1000));
  }

  public setDepartment(user: User, department: string): Observable<User> {
    return of({
      ...user,
      department,
    }).pipe(delay(1000));
  }
}

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  public getDepartments(): Observable<string[]> {
    return of(['HR', 'IT', 'Finance']).pipe(delay(1000));
  }
}
