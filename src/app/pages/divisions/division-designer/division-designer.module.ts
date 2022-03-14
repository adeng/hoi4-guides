import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DivisionDesignerPageRoutingModule } from './division-designer-routing.module';
import { TranslationPipeModule } from 'src/app/pipes/translation.pipe.module';
import { DivisionDesignerPage } from './division-designer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DivisionDesignerPageRoutingModule,
    TranslationPipeModule
  ],
  declarations: [DivisionDesignerPage]
})
export class DivisionDesignerPageModule {}
