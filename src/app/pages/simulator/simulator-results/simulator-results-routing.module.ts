import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SimulatorResultsPage } from './simulator-results.page';

const routes: Routes = [
  {
    path: '',
    component: SimulatorResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimulatorResultsPageRoutingModule {}
