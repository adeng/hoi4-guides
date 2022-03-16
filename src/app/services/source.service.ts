import { Injectable } from '@angular/core';
import { Archetype, Equipment } from '../models/equipment.model';
import { Regiment } from '../models/regiment.model';

import equipment_source from "../../assets/equipment.json";
import regiment_source from "../../assets/regiments.json";

@Injectable({
	providedIn: 'root'
})
export class SourceService {
	ArchetypeDictionary: Map<string, Archetype>;
	EquipmentDictionary: Map<string, Equipment>;
	RegimentDictionary: Map<string, Regiment>;

	constructor() {
		this.ArchetypeDictionary = new Map<string, Archetype>();
		this.EquipmentDictionary = new Map<string, Equipment>();
		this.RegimentDictionary = new Map<string, Regiment>();

		for (let i = 0; i < equipment_source.length; i++) {
			let archetype = equipment_source[i];

			if (!this.ArchetypeDictionary.has(archetype.archetype_id))
				this.ArchetypeDictionary.set(archetype.archetype_id, archetype);

			for (let j = 0; j < archetype.equipment.length; j++) {
				let equipment = archetype.equipment[j];

				if (!this.EquipmentDictionary.has(equipment.equipment_id))
					this.EquipmentDictionary.set(equipment.equipment_id, equipment);
			}
		}

		for (let i = 0; i < regiment_source.length; i++) {
			let regiment = regiment_source[i];

			if (regiment.regiment_id == "railway_gun" && regiment.regiment_name == "")
				regiment.regiment_name = "Railway Gun";

			if (!this.RegimentDictionary.has(regiment.regiment_id))
				this.RegimentDictionary.set(regiment.regiment_id, regiment);
		}
	}

	public getValidEquipment(archetype_id: string): Array<Equipment> {
		return this.ArchetypeDictionary[archetype_id].equipment;
	}

	public getValidRegiments(): Array<Regiment> {
		let results = new Array<Regiment>();

		for (let i = 0; i < regiment_source.length; i++) {
			let valid = true;

			for (let j = 0; j < regiment_source[i].equipment.length; j++) {
				if (!this.ArchetypeDictionary.has(regiment_source[i].equipment[j].archetype_id)) {
					valid = false;
					break;
				}
			}

			if (valid && regiment_source[i].type != "support" && regiment_source[i].regiment_id != "railway_gun") {
				results.push(regiment_source[i]);
			}
		}

		return results;
	}
}
