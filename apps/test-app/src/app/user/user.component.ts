import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IUser } from './user.service/user.interface';

@Component({
  selector: 'app-user',
  standalone: true,
  template: `
    @let user = userData(); @if (user) {
    <h1>{{ user.name }}</h1>
    <p>{{ user.department }}</p>
    @if (user.age > 35) {
    <p>older than 35</p>
    } }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  public userData = input<IUser | null>(null);
}
