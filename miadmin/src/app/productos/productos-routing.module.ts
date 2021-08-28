import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CrearComponent} from './crear/crear.component';
import {CrearProductFormComponent} from './crear-product-form/crear-product-form.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { EditarComponent } from './editar/editar.component';

const routes: Routes = [
  { path: 'crear', component:CrearComponent ,pathMatch: 'full' },
  { path: 'crear-producto-form', component:CrearProductFormComponent ,pathMatch: 'full' },
  { path: 'consultar', component:ConsultarComponent ,pathMatch: 'full' },
  { path: 'editar', component:EditarComponent ,pathMatch: 'full' },


  {path:'', redirectTo: 'crear', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
