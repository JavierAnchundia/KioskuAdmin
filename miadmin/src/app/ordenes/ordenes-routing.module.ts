import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultarComponent } from './consultar/consultar.component';
import { MisentregasComponent } from './misentregas/misentregas.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultarComponent
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
