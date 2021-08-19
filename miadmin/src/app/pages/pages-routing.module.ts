import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriasComponent} from '../categorias/categorias.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {SubcategoriasComponent} from '../subcategorias/subcategorias.component';
import {BodegaComponent} from '../bodega/bodega.component';
import {ItemsComponent} from '../items/items.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MembresiaComponent } from '../membresia/membresia.component';

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

  { path: 'membresia',
  component: MembresiaComponent,
  loadChildren: () => import('../membresia/membresia.module').then(m => m.MembresiaModule)
  },

  { path: '',
    component: DashboardComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
