import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DepartmentsService, User, UserService } from './user.service';
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  switchMap,
  take,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cluttered',
  standalone: true,
  template: `
    @let userData = user$ | async; @if (userData) {
    <h1>{{ userData.name }}</h1>
    <p>{{ userData.age }}</p>

    @if (userData.age > 35) {
    <p>older than 35</p>
    } } @let departments = departments$ | async; @if (departments) { @for (dept
    of departments; track dept) {
    <p (click)="setDepartment(dept)">{{ dept }}</p>
    } }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe],
})
export class ClutteredComponent {
  private _user = new BehaviorSubject<User | null>(null);
  public user$ = this._user.asObservable();

  public departments$: Observable<string[]> | null = null;

  private _userService = inject(UserService);
  private _activeRoute = inject(ActivatedRoute);
  private _departmentsService = inject(DepartmentsService);

  private _userId$: Observable<string> = this._activeRoute.params.pipe(
    map((params) => params['id'])
  );

  constructor() {
    this._userId$
      .pipe(
        switchMap((id) => this._userService.getUser(id)),
        takeUntilDestroyed()
      )
      .subscribe((user) => this._user.next(user));

    this.departments$ = this._departmentsService.getDepartments();
  }

  public setDepartment(department: string): void {
    this._user
      .pipe(
        filter((user) => !!user),
        switchMap((user) => this._userService.setDepartment(user, department)),
        take(1)
      )
      .subscribe((user) => this._user.next(user));
  }
}
