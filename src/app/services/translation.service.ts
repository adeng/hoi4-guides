import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  localizationObject: Object = {
    "infantry": "Infantry",
    "artillery": "Artillery",
    "paratroopers": "Paratroopers",
    "mountaineers": "Mountaineers"
  };

  getDisplayName(technical: string): string {
    return this.localizationObject[technical];
  }

  constructor() { 

  }
}
