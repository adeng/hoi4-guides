import { Component, OnInit } from '@angular/core';
import { DivisionType } from 'src/app/services/models.service';

import types from "../../../../assets/division-types.json";

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.page.html',
  styleUrls: ['./division-list.page.scss'],
})
export class DivisionListPage implements OnInit {
  types: Array<DivisionType>;

  constructor() { 
    this.types = types;
  }

  ngOnInit() {
  }

}
