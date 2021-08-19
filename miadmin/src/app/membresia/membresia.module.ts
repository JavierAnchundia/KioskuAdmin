import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembresiaRoutingModule } from './membresia-routing.module';
import { ConsultarComponent } from './consultar/consultar.component';
import { CrearComponent } from './crear/crear.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { EditarComponent } from './editar/editar.component';


@NgModule({
  declarations: [
    ConsultarComponent,
    CrearComponent,
    EditarComponent
  ],
  imports: [
    CommonModule,
    MembresiaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzButtonModule,
    NzTypographyModule,
    NzTableModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzLayoutModule,
    NzInputModule,
    NzFormModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzMessageModule
  ]
})
export class MembresiaModule { }
