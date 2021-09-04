import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarComponent } from './consultar/consultar.component';
import { MisentregasComponent } from './misentregas/misentregas.component';
import { ConsultaGeneralComponent } from './consulta-general/consulta-general.component';
import { PagPermisosGuard } from '../guards/pagPermisos/pag-permisos.guard';
import { UserAuthenticatedGuard } from '../guards/user-authenticated.guard';

const routes: Routes = [
  {
    path: 'sinasignar',
    component: ConsultarComponent,
    data: { titulo: 'Ordenes/Sin asignar' },
    canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },
  {
    path: 'historial',
    component: ConsultaGeneralComponent,
    data: { titulo: 'Ordenes/Historial' },
    canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },
  {
    path: 'entregas',
    component: MisentregasComponent,
    data: { titulo: 'Ordenes/Entregas' },
    canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesRoutingModule { }
