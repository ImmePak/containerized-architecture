import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-department-selector',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let departmentsList = departments(); @if (departmentsList) { @for (dept of
    departmentsList; track dept) {
    <p (click)="setDepartment.emit(dept)">{{ dept }}</p>
    } }
  `,
})
export class DepartmentSelectorComponent {
  public departments = input<string[] | null>(null);
  public setDepartment = output<string>();
}
