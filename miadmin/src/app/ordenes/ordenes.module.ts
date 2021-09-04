import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenesRoutingModule } from './ordenes-routing.module';
import { OrdenesComponent } from './ordenes/ordenes.component';
import { ConsultarComponent } from './consultar/consultar.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MisentregasComponent } from './misentregas/misentregas.component';
import { ConsultaGeneralComponent } from './consulta-general/consulta-general.component';


@NgModule({
  declarations: [
    OrdenesComponent,
    ConsultarComponent,
    MisentregasComponent,
    ConsultaGeneralComponent
  ],
  imports: [
    CommonModule,
    OrdenesRoutingModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzIconModule,
    NzMessageModule,
    NzModalModule
  ]
})
export class OrdenesModule { }
