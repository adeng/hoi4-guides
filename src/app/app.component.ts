import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Divisions', url: '/divisions', icon: 'clipboard' },
    { title: 'Combat Simulator', url: '/simulator', icon: 'stats-chart' },
    { title: 'Tank Designer', url: '/designer', icon: 'hammer' },
    { title: 'Naval Designer', url: '/designer', icon: 'boat' },
    { title: 'Country Guides', url: '/countries', icon: 'flag' }
  ];
  public labels = [];
  constructor() {}
}
