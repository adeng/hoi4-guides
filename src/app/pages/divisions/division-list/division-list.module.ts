import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DivisionListPageRoutingModule } from './division-list-routing.module';

import { DivisionListPage } from './division-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DivisionListPageRoutingModule
  ],
  declarations: [DivisionListPage]
})
export class DivisionListPageModule {}
