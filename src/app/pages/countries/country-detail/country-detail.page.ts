import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Country, CountryFlag, CountryStrategy } from 'src/app/models/country.model';
import { SourceService } from 'src/app/services/source.service';

@Component({
	selector: 'app-country-detail',
	templateUrl: './country-detail.page.html',
	styleUrls: ['./country-detail.page.scss'],
})
export class CountryDetailPage implements OnInit {
	country: Country;
	strategy: CountryStrategy;
	flag: CountryFlag;

	constructor(private source: SourceService, private route: ActivatedRoute) {
		let tag = this.route.snapshot.params["tag"];
		let strategy = this.route.snapshot.params["strategy"];
		this.country = this.source.getCountry(tag);
		this.strategy = this.source.getCountryStrategy(tag, strategy);
		this.flag = this.source.getCountryFlag(this.strategy.flag_name, "full");
	}

	ngOnInit() {
	}

	getProductionColor(category: string) {
		switch(category) {
			case "small_arms":
				return "secondary";
			case "armor":
				return "primary";
			case "air":
				return "tertiary";
		}
	}

}
