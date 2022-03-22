import { Injectable } from '@angular/core';
import { Division } from '../models/division.model';
import { StorageService } from './storage.service';
import { SourceService } from './source.service';

@Injectable({
	providedIn: 'root'
})
export class DivisionsService {
	constructor(private storage: StorageService, private source: SourceService) {
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

	public getDivision(id: number): Promise<Division> {
		return this.storage.get("division-list").then((data: Array<Division>) => {
			return data[id];
		});
	}

	public updateDivision(id: number, division: Division): Promise<void> {
		return this.storage.get("division-list").then((data: Array<Division>) => {
			let divisions = data;
			divisions[id] = division;
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

	public calculateDivisionExperienceModifiers(type: number): number {
		switch(type) {
			case 0:
				return -0.25;
			case 1:
				return 0;
			case 2: 
				return 0.25;
			case 3:
				return 0.5;
			case 4:
				return 0.75;
		}
	}

	public calculateDivisionTerrainModifiers(terrain: string, division: Division): [number, number] {
		let offensive = 0;
		let defensive = 0;

		for(let i = 0; i < division.regiments.length; i++) {
			let modifier = this.source.getRegimentTerrainModifier(terrain, division.regiments[i].regiment.regiment_id);
			if(modifier != null) {
				offensive += modifier.attack;
				defensive += modifier.defense;
			}

		}

		return [offensive/division.regiments.length, defensive/division.regiments.length];
	}
}
