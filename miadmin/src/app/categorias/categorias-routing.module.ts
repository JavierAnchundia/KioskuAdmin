import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultarComponent} from './consultar/consultar.component';

const routes: Routes = [
  { path: 'consultar', component:ConsultarComponent ,pathMatch: 'full' },
  {path:'', redirectTo: 'consultar', pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
