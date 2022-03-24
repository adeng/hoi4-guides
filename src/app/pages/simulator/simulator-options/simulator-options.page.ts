import { Component, OnInit } from '@angular/core';
import { Division } from 'src/app/models/division.model';
import { DivisionsService } from 'src/app/services/divisions.service';
import { CombatModifiers } from 'src/app/services/simulator.service';

@Component({
	selector: 'app-simulator-options',
	templateUrl: './simulator-options.page.html',
	styleUrls: ['./simulator-options.page.scss'],
})
export class SimulatorOptionsPage implements OnInit {
	divisions: Array<Division>;
	attackingDivision: Division;
	defendingDivision: Division;
	options: CombatModifiers;

	constructor(private division: DivisionsService) { 
		this.options = {
			attackerExp: 1,
			defenderExp: 1,
			terrain: "plains"
		}
		this.divisions = new Array<Division>();
		
		this.division.getAllDivisions().then((data: Array<Division>) => {
			this.divisions = data;
		})
	}

	ngOnInit() {
	}

	getQueryParams(): Object {
		return {
			attacker: JSON.stringify(this.attackingDivision),
			defender: JSON.stringify(this.defendingDivision),
			options: JSON.stringify(this.options)
		};
	}

}
