import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { SharedComponent } from './shared/shared.component';
import { PagesComponent } from './pages/pages.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { SubcategoriasComponent } from './subcategorias/subcategorias.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { BodegaComponent } from './bodega/bodega.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    SharedComponent,
    PagesComponent,
    SidebarComponent,
    SubcategoriasComponent,
    BodegaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FontAwesomeModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzDividerModule,
    ReactiveFormsModule,
    ScrollingModule,
    HttpClientJsonpModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }],
  bootstrap: [AppComponent]
})
export class AppModule { }
