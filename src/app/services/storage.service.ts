import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { Division } from '../models/division.model';

@Injectable({
	providedIn: 'root'
})
export class StorageService {

	constructor() { 
	}

	public async set(key: string, value: any) {
		await Storage.set({
			key: key,
			value: JSON.stringify(value)
		});
	}

	public async get(key: string): Promise<any> {
		const ret = await Storage.get({key: key}); // this is a promise
		return JSON.parse(ret.value);
	}
}
