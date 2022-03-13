import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DivisionDetailPage } from './division-detail.page';

const routes: Routes = [
  {
    path: '',
    component: DivisionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivisionDetailPageRoutingModule {}
