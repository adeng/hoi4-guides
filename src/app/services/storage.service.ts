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
			value: JSON.stringify(value, this.replacer)
		});
	}

	public async get(key: string): Promise<any> {
		const ret = await Storage.get({ key: key }); // this is a promise
		return JSON.parse(ret.value, this.reviver);
	}

	private replacer(key: string, value: any) {
		if (value instanceof Map) {
			return {
				dataType: 'Map',
				value: Array.from(value.entries()), // or with spread: value: [...value]
			};
		} else {
			return value;
		}
	}

	private reviver(key: string, value: any) {
		if (typeof value === 'object' && value !== null) {
			if (value.dataType === 'Map') {
				return new Map(value.value);
			}
		}
		return value;
	}
}
