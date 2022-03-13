import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DivisionListPage } from './division-list.page';

const routes: Routes = [
  {
    path: '',
    component: DivisionListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivisionListPageRoutingModule {}
