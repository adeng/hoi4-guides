import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Division } from '../models/division.model';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	// Storage variables
	private _storage: Storage | null = null;

	// Division variables
	divisions: Array<Division>;

	constructor(private storage: Storage) { 
		this.init();
	}

	ngOnInit() {
	}

	async init() {
		const storage = await this.storage.create();
		this._storage = storage;
		
		let divisions = await this.storage.get("division-list");

		if(divisions == undefined)
			divisions = new Array<Division>();
		else 
			divisions = divisions;
	}

	public set(key: string, value: any): void {
		this._storage?.set(key, value);
	}

	async get(key: string) {
		console.log("Called");
		let result = await this._storage.get(key);
		return result;
	}

	// Division related items
	public addDivision(division: Division) {
		this.divisions.push(division);
		this.storage.set("division-list", this.divisions);

		console.log(this.divisions);
	}

	public getNextDivisionID(): number {
		if(this.divisions == undefined)
			this.divisions = new Array<Division>();

		return this.divisions.length;
	}

	public getAllDivisions(): Array<Division> {
		return this.divisions;
	}
}
