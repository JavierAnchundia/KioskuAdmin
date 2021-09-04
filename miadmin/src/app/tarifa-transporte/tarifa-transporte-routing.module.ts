import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModificarComponent} from './modificar/modificar.component';

const routes: Routes = [
  { path: 'modificar', component:ModificarComponent ,pathMatch: 'full' },
  {path:'', redirectTo: 'modificar', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TarifaTransporteRoutingModule { }
