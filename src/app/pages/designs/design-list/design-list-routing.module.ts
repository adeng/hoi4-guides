import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesignListPage } from './design-list.page';

const routes: Routes = [
  {
    path: '',
    component: DesignListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DesignListPageRoutingModule {}
