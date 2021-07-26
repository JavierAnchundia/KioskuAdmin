import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubcategoriasRoutingModule } from './subcategorias-routing.module';
import { ConsultarComponent } from './consultar/consultar.component';
import { CrearComponent } from './crear/crear.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzFormModule } from 'ng-zorro-antd/form';

import { IconsProviderModule } from '../icons-provider.module';

@NgModule({
  declarations: [
    ConsultarComponent,
    CrearComponent
  ],
  imports: [
    CommonModule,
    SubcategoriasRoutingModule,
    NzTableModule,
    IconsProviderModule,
    NzDropDownModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzModalModule,
    NzLayoutModule,
    DragDropModule,
    ScrollingModule,
    HttpClientJsonpModule,
    HttpClientModule,
    NzAlertModule,
    NzFormModule
  ]
})
export class SubcategoriasModule { }
