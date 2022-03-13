import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DesignListPageRoutingModule } from './design-list-routing.module';

import { DesignListPage } from './design-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DesignListPageRoutingModule
  ],
  declarations: [DesignListPage]
})
export class DesignListPageModule {}
