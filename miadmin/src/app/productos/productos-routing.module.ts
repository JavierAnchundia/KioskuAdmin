import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CrearComponent} from './crear/crear.component';
import {CrearProductFormComponent} from './crear-product-form/crear-product-form.component';

const routes: Routes = [
  { path: 'crear', component:CrearComponent ,pathMatch: 'full' },
  { path: 'crear-producto-form', component:CrearProductFormComponent ,pathMatch: 'full' },


  {path:'', redirectTo: 'crear', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
