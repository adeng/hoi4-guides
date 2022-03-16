import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseEquipmentPageRoutingModule } from './choose-equipment-routing.module';

import { ChooseEquipmentPage } from './choose-equipment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseEquipmentPageRoutingModule
  ],
  declarations: [ChooseEquipmentPage]
})
export class ChooseEquipmentPageModule {}
