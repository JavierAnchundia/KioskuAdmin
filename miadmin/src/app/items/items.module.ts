import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { AsignarseComponent } from './asignarse/asignarse.component';

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
import { MisitemsComponent } from './misitems/misitems.component';
import { EvaluarComponent } from './evaluar/evaluar.component';


import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import { NzInputNumberModule} from 'ng-zorro-antd/input-number';
import { NzImageModule} from 'ng-zorro-antd/image';



@NgModule({
  declarations: [
    AsignarseComponent,
    MisitemsComponent,
    EvaluarComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
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
    NzModalModule,
    NzSelectModule,
    NzCarouselModule,
    NzAutocompleteModule,
    NzInputNumberModule,
    NzImageModule

  ]
})
export class ItemsModule { }
