import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: '', component:PagesComponent ,pathMatch: 'full' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'inicio',
    component: PagesComponent,

    //canActivate: [LoggedUserGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
