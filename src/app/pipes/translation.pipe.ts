import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translation'
})
export class TranslationPipe implements PipeTransform {

  constructor(public translate: TranslationService) {}

  transform(value: string): string {
    return this.translate.getDisplayName(value);
  }

}
