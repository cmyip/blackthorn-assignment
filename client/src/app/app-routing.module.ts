import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationGuard, NotAuthenticationGuard} from '@approot/core/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@approot/layout/layout.module').then(m => m.LayoutModule),
    canActivate: [
      NotAuthenticationGuard
    ]
  },
  /*{
    path: 'auth',
    loadChildren: () => import('@approot/authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [
      NotAuthenticationGuard
    ]
  },*/
  {
    path: '**',
    redirectTo: '/welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
