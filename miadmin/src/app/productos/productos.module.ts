import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { CrearComponent } from './crear/crear.component';

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
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import { NzUploadModule} from 'ng-zorro-antd/upload';

import { CrearProductFormComponent } from './crear-product-form/crear-product-form.component';


@NgModule({
  declarations: [
    CrearComponent,
    CrearProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    CommonModule,
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
    NzUploadModule
  ]
})
export class ProductosModule { }
