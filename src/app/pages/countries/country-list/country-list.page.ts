import { Component, OnInit } from '@angular/core';

import countries from "../../../../assets/countries.json";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.page.html',
  styleUrls: ['./country-list.page.scss'],
})
export class CountryListPage implements OnInit {

  // countries: Array<Country>;

  constructor() {
    // this.countries = countries;
  }

  ngOnInit() {
  }

}

