import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimulatorResultsPageRoutingModule } from './simulator-results-routing.module';

import { SimulatorResultsPage } from './simulator-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimulatorResultsPageRoutingModule
  ],
  declarations: [SimulatorResultsPage]
})
export class SimulatorResultsPageModule {}
