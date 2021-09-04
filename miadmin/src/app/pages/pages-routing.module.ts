import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriasComponent} from '../categorias/categorias.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {SubcategoriasComponent} from '../subcategorias/subcategorias.component';
import {BodegaComponent} from '../bodega/bodega.component';
import {ItemsComponent} from '../items/items.component';
import {ProductosComponent} from '../productos/productos.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MembresiaComponent } from '../membresia/membresia.component';
import { OrdenesComponent } from '../ordenes/ordenes/ordenes.component';
import { TarifaTransporteComponent } from '../tarifa-transporte/tarifa-transporte.component';
import { AnunciosComponent } from '../anuncios/anuncios/anuncios.component';
import { PagPermisosGuard } from '../guards/pagPermisos/pag-permisos.guard';
import { UserAuthenticatedGuard } from '../guards/user-authenticated.guard';

const routes: Routes = [
  {
    path: 'categorias',
    component: CategoriasComponent,
    data: { titulo: 'Categorias' },
    loadChildren: () => import('../categorias/categorias.module').then(m => m.CategoriasModule),
    canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },

  {
    path: 'welcome2',
    component: WelcomeComponent,
    data: { titulo: 'Welcome2' },
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },

  { path: 'subcategorias',
    component: SubcategoriasComponent,
    data: { titulo: 'Subcategorias' },
    loadChildren: () => import('../subcategorias/subcategorias.module').then(m => m.SubcategoriasModule),
    canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },

  { path: 'bodegas',
  component: BodegaComponent,
  data: { titulo: 'Bodegas' },
  loadChildren: () => import('../bodega/bodega.module').then(m => m.BodegaModule),
  canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },

  { path: 'items',
  component: ItemsComponent,
  data: { titulo: 'Items' },
  loadChildren: () => import('../items/items.module').then(m => m.ItemsModule),
  canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },

  { path: 'productos',
  component: ProductosComponent,
  data: { titulo: 'Productos' },
  loadChildren: () => import('../productos/productos.module').then(m => m.ProductosModule),
  canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },
  { path: 'membresia',
  component: MembresiaComponent,
  data: { titulo: 'Membresia' },
  loadChildren: () => import('../membresia/membresia.module').then(m => m.MembresiaModule),
  canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },

  { path: 'ordenes',
  component: OrdenesComponent,
  data: { titulo: 'Ordenes' },
  loadChildren: () => import('../ordenes/ordenes.module').then(m => m.OrdenesModule),
  canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },

  { path: 'tarifa-transporte',
  component: TarifaTransporteComponent,
  data: { titulo: 'Tarifa Transporte' },
  loadChildren: () => import('../tarifa-transporte/tarifa-transporte.module').then(m => m.TarifaTransporteModule),
  canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },

  { path: 'anuncios',
  component: AnunciosComponent,
  data: { titulo: 'Anuncios' },
  loadChildren: () => import('../anuncios/anuncios.module').then(m => m.AnunciosModule),
  canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },

  { path: 'dashboard',
    component: DashboardComponent,
    data: { titulo: 'Dashboard' },
    canActivate: [PagPermisosGuard, UserAuthenticatedGuard],
  },

  {path:'', redirectTo: 'dashboard', pathMatch:'full'},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
