import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslationPipe } from "./translation.pipe";

@NgModule({
    declarations: [TranslationPipe],
    imports: [IonicModule],
    exports: [TranslationPipe]
})
export class TranslationPipeModule {}