import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DivisionHomePage } from './division-home.page';

const routes: Routes = [
  {
    path: '',
    component: DivisionHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivisionHomePageRoutingModule {}
