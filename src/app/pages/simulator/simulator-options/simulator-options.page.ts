import { Component, OnInit } from '@angular/core';
import { Division } from 'src/app/models/division.model';
import { DivisionsService } from 'src/app/services/divisions.service';

@Component({
	selector: 'app-simulator-options',
	templateUrl: './simulator-options.page.html',
	styleUrls: ['./simulator-options.page.scss'],
})
export class SimulatorOptionsPage implements OnInit {
	divisions: Array<Division>;
	attackingDivision: Division;
	defendingDivision: Division;

	constructor(private division: DivisionsService) { 
		this.divisions = new Array<Division>();
		
		this.division.getAllDivisions().then((data: Array<Division>) => {
			this.divisions = data;
		})
	}

	ngOnInit() {
	}

}
