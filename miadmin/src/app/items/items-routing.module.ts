import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AsignarseComponent} from './asignarse/asignarse.component';
import {MisitemsComponent} from './misitems/misitems.component';
import {EvaluarComponent} from './evaluar/evaluar.component';
import { PagPermisosGuard } from '../guards/pagPermisos/pag-permisos.guard';
import { UserAuthenticatedGuard } from '../guards/user-authenticated.guard';

const routes: Routes = [
  { path: 'asignar',
   component:AsignarseComponent ,
   data: { titulo: 'Items/Asignar' },
   canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
   pathMatch: 'full' },

  { path: 'mis-items', 
  component:MisitemsComponent,
  data: { titulo: 'Items/Mis Items' },
  canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  pathMatch: 'full' },

  { path: 'evaluar',
   component:EvaluarComponent,
   data: { titulo: 'Items/Evaluar' },
   canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
   pathMatch: 'full' },

  {path:'', redirectTo: 'asignar', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
