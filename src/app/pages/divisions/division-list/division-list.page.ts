import { Component, OnInit } from '@angular/core';
import { Division } from 'src/app/models/division.model';
import { StorageService } from 'src/app/services/storage.service';

@Component({
	selector: 'app-division-list',
	templateUrl: './division-list.page.html',
	styleUrls: ['./division-list.page.scss'],
})
export class DivisionListPage implements OnInit {
	divisions: Array<Division>;

	constructor(private storage: StorageService) {
		this.divisions = this.storage.getAllDivisions();
		console.log(this.divisions);
	}

	ngOnInit() {
	}

}
