import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NzDropDownModule,
    NzLayoutModule,
    FontAwesomeModule
  ],
  exports: [
    SidebarComponent,
    NzDropDownModule
],
  

  
})
export class SharedModule { }
