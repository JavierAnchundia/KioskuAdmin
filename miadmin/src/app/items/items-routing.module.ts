import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AsignarseComponent} from './asignarse/asignarse.component';
import {MisitemsComponent} from './misitems/misitems.component';
import {EvaluarComponent} from './evaluar/evaluar.component';

const routes: Routes = [
  { path: 'asignar', component:AsignarseComponent ,pathMatch: 'full' },
  { path: 'mis-items', component:MisitemsComponent ,pathMatch: 'full' },
  { path: 'evaluar', component:EvaluarComponent ,pathMatch: 'full' },

  {path:'', redirectTo: 'asignar', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
