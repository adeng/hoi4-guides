import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimulatorOptionsPageRoutingModule } from './simulator-options-routing.module';

import { SimulatorOptionsPage } from './simulator-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimulatorOptionsPageRoutingModule
  ],
  declarations: [SimulatorOptionsPage]
})
export class SimulatorOptionsPageModule {}
