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

	public init(): void {
		this.storage.get("division-list").then((data: Array<Division>) => {
			if(data == null) {
				this.storage.set("division-list", new Array<Division>());
			}
		});
	}

	// Division related items
	public async addDivision(division: Division): Promise<void> {
		this.storage.get("division-list").then((data: Array<Division>) => {
			let divisions = data;
			
			if(data == null)
				divisions = new Array<Division>();

			divisions.push(division);
			this.storage.set("division-list", divisions);
		});
	}

	public getNextDivisionID(): Promise<number> {
		return this.storage.get("division-list").then((data: Array<Division>) => {
			if(data == null)
				return 0;
			else
				return data.length;
		});
	}

	public getAllDivisions(): Promise<Array<Division>>  {
		return this.storage.get("division-list").then((data: Array<Division>) => {
			return data;
		});
	}
}
