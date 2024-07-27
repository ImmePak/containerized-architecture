import { Observable } from 'rxjs';

export interface IDepartmentService {
  getDepartments(): Observable<string[]>;
}
