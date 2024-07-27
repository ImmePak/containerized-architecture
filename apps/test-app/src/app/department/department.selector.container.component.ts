import {
  Component,
  ChangeDetectionStrategy,
  output,
  inject,
  signal,
} from '@angular/core';
import { DEPARTMENT_SERVICE } from './department.service';
import { DepartmentSelectorComponent } from './department.selector.component';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-department-selector-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DepartmentSelectorComponent, AsyncPipe],
  template: `
    <app-department-selector
      [departments]="departments()"
      (setDepartment)="setDepartment.emit($event)"
    />
  `,
})
export class DepartmentSelectorContainerComponent {
  private _departmentService = inject(DEPARTMENT_SERVICE);

  public setDepartment = output<string>();
  public departments = signal<string[] | null>(null);

  constructor() {
    this._departmentService
      .getDepartments()
      .pipe(takeUntilDestroyed())
      .subscribe((departments) => this.departments.set(departments));
  }
}
