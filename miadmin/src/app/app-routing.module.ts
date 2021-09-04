import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserAuthenticatedGuard } from './guards/user-authenticated.guard';
import { PagesComponent } from './pages/pages.component';
import { PagPermisosGuard } from './guards/pagPermisos/pag-permisos.guard';

const routes: Routes = [
  { path: '', component: AuthComponent, pathMatch: 'full' },
  { path: 'welcome',
   data: { titulo: 'Welcome' },
   loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
   canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },

  {
    path: 'inicio',
    data: { titulo: 'Inicio' },
    component: PagesComponent,
    canActivate: [UserAuthenticatedGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
