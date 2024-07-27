import { InjectionToken } from '@angular/core';
import { IDepartmentService } from './department.service.interface';
import { DepartmentsService } from './department.service';

export const DEPARTMENT_SERVICE = new InjectionToken<IDepartmentService>(
  'DEPARTMENT_SERVICE',
  {
    providedIn: 'root',
    factory: () => new DepartmentsService(),
  }
);
