import { Component, OnInit } from '@angular/core';
import { Country, CountryFlag, CountryGuide, CountryStrategy } from 'src/app/models/country.model';
import { SourceService } from 'src/app/services/source.service';


@Component({
	selector: 'app-country-list',
	templateUrl: './country-list.page.html',
	styleUrls: ['./country-list.page.scss'],
})
export class CountryListPage implements OnInit {
	countryColor: string;
	guides: Array<CountryGuide>;
	countries: Map<string, Country>;
	countryFlags: Map<string, CountryFlag>;
	strategies: Map<string, Array<CountryStrategy>>;
	currentStrategies: Array<CountryStrategy>;

	constructor(private source: SourceService) {
		this.guides = this.source.getCountryGuides();
		this.countries = new Map<string, Country>();
		this.countryFlags = new Map<string, CountryFlag>();
		this.strategies = new Map<string, Array<CountryStrategy>>();

		for(let i = 0; i < this.guides.length; i++) {
			this.countries.set(this.guides[i].tag, this.source.getCountry(this.guides[i].tag));

			if(this.guides[i].strategies.length == 0) {
				let name = this.guides[i].flag_name;
				this.countryFlags.set(name, this.source.getCountryFlag(name, "full"));
			} else {
				for(let j = 0; j < this.guides[i].strategies.length; j++) {
					let name = this.guides[i].strategies[j].flag_name;
					this.countryFlags.set(name, this.source.getCountryFlag(name, "full"));
				}

				this.strategies.set(this.guides[i].tag, this.guides[i].strategies);
			}
		}

		console.log(this.countryFlags);
	}

	ngOnInit() {
	}

	setGuide(tag: string): void {
		this.currentStrategies = this.strategies.get(tag);
		this.countryColor = "'" + this.countries.get(tag).color + "'";
	}
}

