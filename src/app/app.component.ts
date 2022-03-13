import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Divisions', url: '/divisions', icon: 'mail' },
    { title: 'Designer', url: '/designer', icon: 'paper-plane' },
    { title: 'Countries', url: '/countries', icon: 'heart' }
  ];
  public labels = [];
  constructor() {}
}
