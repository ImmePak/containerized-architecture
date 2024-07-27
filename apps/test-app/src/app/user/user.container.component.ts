import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { DepartmentSelectorContainerComponent } from '../department/department.selector.container.component';
import { UserComponent } from './user.component';
import { IUser, USER_SERVICE } from './user.service';
import { distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-container',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DepartmentSelectorContainerComponent, UserComponent],
  template: `
    <app-user [userData]="user()" />
    <app-department-selector-container
      (setDepartment)="onSetDepartment($event)"
    />
  `,
})
export class UserContainerComponent implements OnInit {
  @Input({ required: true }) userId!: Observable<string>;

  public user = signal<IUser | null>(null);
  private _userService = inject(USER_SERVICE);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.userId
      .pipe(
        distinctUntilChanged(),
        switchMap((id) => this._userService.getUser(id)),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe((user) => this.user.set(user));
  }

  public onSetDepartment(newDepartment: string) {
    const currentUser = this.user();
    if (!currentUser) {
      throw new Error('User is not set');
    }

    this._userService
      .setDepartment(currentUser, newDepartment)
      .subscribe((updatedUser) => this.user.set(updatedUser));
  }
}
