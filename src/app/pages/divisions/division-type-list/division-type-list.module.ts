import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DivisionTypeListPageRoutingModule } from './division-type-list-routing.module';

import { DivisionTypeListPage } from './division-type-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DivisionTypeListPageRoutingModule
  ],
  declarations: [DivisionTypeListPage]
})
export class DivisionTypeListPageModule {}
