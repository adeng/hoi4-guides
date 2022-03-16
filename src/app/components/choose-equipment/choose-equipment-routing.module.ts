import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseEquipmentPage } from './choose-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseEquipmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseEquipmentPageRoutingModule {}
