import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ConsultarComponent } from './consultar/consultar.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzFormModule } from 'ng-zorro-antd/form';


import { NzModalModule } from 'ng-zorro-antd/modal';


import { IconsProviderModule } from '../icons-provider.module';
import { CrearComponent } from './crear/crear.component';

@NgModule({
  declarations: [
    ConsultarComponent,
    CrearComponent,
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    NzTableModule,
    IconsProviderModule,
    NzDropDownModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzGridModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzModalModule
  ]

})
export class CategoriasModule { }
