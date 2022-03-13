import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DivisionDetailPageRoutingModule } from './division-detail-routing.module';

import { DivisionDetailPage } from './division-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DivisionDetailPageRoutingModule
  ],
  declarations: [DivisionDetailPage]
})
export class DivisionDetailPageModule {}
