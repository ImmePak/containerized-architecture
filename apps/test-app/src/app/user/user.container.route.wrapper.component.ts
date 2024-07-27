import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserContainerComponent } from './user.container.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-container-route-wrapper',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UserContainerComponent],
  template: `
    @if (userId) {
    <app-user-container [userId]="userId" />
    }
  `,
})
export class UserContainerRouteWrapperComponent {
  public userId!: Observable<string>;

  constructor(activatedRoute: ActivatedRoute) {
    this.userId = activatedRoute.params.pipe(
      map((params) => params['id']),
      takeUntilDestroyed()
    );
  }
}
