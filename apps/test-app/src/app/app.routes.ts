import { Route } from '@angular/router';
import { UserContainerRouteWrapperComponent } from './user/user.container.route.wrapper.component';

export const appRoutes: Route[] = [
  {
    path: 'user/:id',
    component: UserContainerRouteWrapperComponent,
  },
];
