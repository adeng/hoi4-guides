import { Component, OnInit } from '@angular/core';
import { Division } from 'src/app/models/division.model';
import { DivisionsService } from 'src/app/services/divisions.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-division-list',
	templateUrl: './division-list.page.html',
	styleUrls: ['./division-list.page.scss'],
})
export class DivisionListPage implements OnInit {
	divisions: Array<Division> | null;

	constructor(private division: DivisionsService) {
		this.updateDivisions();
	}

	ngOnInit(): void {
		
	}

	ionViewWillEnter() {
		this.updateDivisions();
	}

	updateDivisions(): void {
		// Update 
		this.division.getAllDivisions().then((data: Array<Division>) => {
			this.divisions = data;
			console.log(this.divisions);
		});
	}

}
