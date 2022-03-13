import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DivisionTypeListPage } from './division-type-list.page';

const routes: Routes = [
  {
    path: '',
    component: DivisionTypeListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivisionTypeListPageRoutingModule {}
