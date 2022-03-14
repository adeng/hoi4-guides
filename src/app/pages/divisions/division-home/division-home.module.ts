import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DivisionHomePageRoutingModule } from './division-home-routing.module';

import { DivisionHomePage } from './division-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DivisionHomePageRoutingModule
  ],
  declarations: [DivisionHomePage]
})
export class DivisionHomePageModule {}
