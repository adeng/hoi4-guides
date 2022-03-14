import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DivisionDesignerPage } from './division-designer.page';

const routes: Routes = [
  {
    path: '',
    component: DivisionDesignerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivisionDesignerPageRoutingModule {}
