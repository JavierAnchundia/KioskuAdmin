import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriasComponent} from '../categorias/categorias.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {SubcategoriasComponent} from '../subcategorias/subcategorias.component';
import {BodegaComponent} from '../bodega/bodega.component';
import {ItemsComponent} from '../items/items.component';
import {ProductosComponent} from '../productos/productos.component';

const routes: Routes = [
  {
    path: 'categorias',
    component: CategoriasComponent,
    loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasModule)
  },

  {
    path: 'welcome2',
    component: WelcomeComponent,
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule)
  },

  { path: 'subcategorias', 
    component: SubcategoriasComponent,
    loadChildren: () => import('../subcategorias/subcategorias.module').then(m => m.SubcategoriasModule)
  },

  { path: 'bodegas', 
  component: BodegaComponent,
  loadChildren: () => import('../bodega/bodega.module').then(m => m.BodegaModule)
  },

  { path: 'items', 
  component: ItemsComponent,
  loadChildren: () => import('../items/items.module').then(m => m.ItemsModule)
  },

  { path: 'productos', 
  component: ProductosComponent,
  loadChildren: () => import('../productos/productos.module').then(m => m.ProductosModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
