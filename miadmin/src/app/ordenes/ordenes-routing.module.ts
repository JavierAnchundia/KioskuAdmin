import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarComponent } from './consultar/consultar.component';
import { MisentregasComponent } from './misentregas/misentregas.component';
import { ConsultaGeneralComponent } from './consulta-general/consulta-general.component';

const routes: Routes = [
  {
    path: 'sinasignar',
    component: ConsultarComponent
  },
  {
    path: 'historial',
    component: ConsultaGeneralComponent
  },
  {
    path: 'entregas',
    component: MisentregasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesRoutingModule { }
