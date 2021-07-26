import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultarComponent} from './consultar/consultar.component';
import {CrearComponent} from './crear/crear.component';

const routes: Routes = [
  { path: 'consultar', component:ConsultarComponent ,pathMatch: 'full' },
  {path:'', redirectTo: 'consultar', pathMatch:'full'},
  {path:'crear', component:CrearComponent, pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubcategoriasRoutingModule { }
