import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { IDepartmentService } from './department.service.interface';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService implements IDepartmentService {
  public getDepartments(): Observable<string[]> {
    return of(['HR', 'IT', 'Finance']).pipe(delay(1000));
  }
}
