import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () => import('@approot/pages/welcome/welcome.module').then(m => m.WelcomeModule)
      },
      {
        path: 'user',
        loadChildren: () => import('@approot/pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'events',
        loadChildren: () => import('@approot/pages/events/events.module').then(m => m.EventsModule)
      },
      {
        path: '**',
        redirectTo: 'events',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule {
}
