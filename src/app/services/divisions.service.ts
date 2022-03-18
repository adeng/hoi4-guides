import { Injectable } from '@angular/core';
import { Division } from '../models/division.model';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class DivisionsService {

	constructor(private storage: StorageService) {
		this.init();
	}

	ngOnInit() {
	}

	public async init() {
		let storage = await this.storage.get("division-list");
	}

}
