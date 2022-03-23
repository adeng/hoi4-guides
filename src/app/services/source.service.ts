import { Injectable } from '@angular/core';
import { Archetype, Equipment } from '../models/equipment.model';
import { Regiment, RegimentTerrainModifier } from '../models/regiment.model';
import { Country, CountryFlag, CountryGuide } from '../models/country.model';

import equipment_source from "../../assets/equipment.json";
import regiment_source from "../../assets/regiments.json";
import terrain_source from "../../assets/terrain.json";
import country_source from "../../assets/countries.json";
import guide_source from "../../assets/countries-content.json";



@Injectable({
	providedIn: 'root'
})
export class SourceService {
	CountryGuideList: Array<CountryGuide>;
	ArchetypeDictionary: Map<string, Archetype>;
	EquipmentDictionary: Map<string, Equipment>;
	RegimentDictionary: Map<string, Regiment>;
	CountryDictionary: Map<string, Country>;
	CountryFlagDictionary: Map<string, CountryFlag>;
	TerrainModifierDictionary: Map<string, Map<string, RegimentTerrainModifier>>;

	constructor() {
		this.ArchetypeDictionary = new Map<string, Archetype>();
		this.EquipmentDictionary = new Map<string, Equipment>();
		this.RegimentDictionary = new Map<string, Regiment>();
		this.CountryDictionary = new Map<string, Country>();
		this.CountryFlagDictionary = new Map<string, CountryFlag>();
		this.TerrainModifierDictionary = new Map<string, Map<string, RegimentTerrainModifier>>();
		this.CountryGuideList = new Array<CountryGuide>();

		// Load equipment json
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

		// Load regiment json
		for (let i = 0; i < regiment_source.length; i++) {
			let regiment = regiment_source[i];

			if (regiment.regiment_id == "railway_gun" && regiment.regiment_name == "")
				regiment.regiment_name = "Railway Gun";

			if (!this.RegimentDictionary.has(regiment.regiment_id))
				this.RegimentDictionary.set(regiment.regiment_id, regiment);
		}

		// Load terrain json
		for(let i = 0; i < terrain_source.length; i++) {
			let terrain = terrain_source[i];

			if(!this.TerrainModifierDictionary.has(terrain.terrain))
				this.TerrainModifierDictionary.set(terrain.terrain, new Map<string, RegimentTerrainModifier>());

			for(let j = 0; j < terrain.regiments.length; j++) {
				let regiment = terrain.regiments[j];
				this.TerrainModifierDictionary.get(terrain.terrain).set(regiment.regiment_id, regiment);
			}
		}

		// Load countries json
		for(let i = 0; i < country_source.length; i++) {
			let country = country_source[i];

			if(!this.CountryDictionary.has(country.tag))
				this.CountryDictionary.set(country.tag, country);
			
			for(let j = 0; j < country.flags.length; j++) {
				let flag = country.flags[j];
				let key = [flag.flag_name, flag.size].join(",");

				if(!this.CountryFlagDictionary.has(key))
					this.CountryFlagDictionary.set(key, flag);
			}
		}

		// Load strategies
		for(let i = 0; i < guide_source.length; i++) {
			this.CountryGuideList.push(guide_source[i]);
		}
	}

	public getCountryGuides(): Array<CountryGuide> {
		return this.CountryGuideList;
	}

	public getCountry(tag: string): Country {
		return this.CountryDictionary.get(tag);
	}

	public getCountryFlag(flag_name: string, size: string): CountryFlag {
		return this.CountryFlagDictionary.get([flag_name, size].join(","));
	}

	public getRegimentTerrainModifier(terrain: string, regiment_id: string): RegimentTerrainModifier {
		try {
			return this.TerrainModifierDictionary.get(terrain).get(regiment_id);
		} catch {
			return null;
		}
	}

	public getFirstValidEquipment(archetype_id: string): Equipment {
		let equipment;
		let minYear = 2000;

		for(let i = 0; i < this.ArchetypeDictionary.get(archetype_id).equipment.length; i++) {
			let current = this.ArchetypeDictionary.get(archetype_id).equipment[i];
			
			if(current.year < minYear) {
				equipment = current;
				minYear = current.year;
			}
		}

		return equipment;
	}

	public getEquipmentByID(equipment_id: string): Equipment {
		return this.EquipmentDictionary.get(equipment_id);
	}

	public getValidEquipment(archetype_id: string): Array<Equipment> {
		return this.ArchetypeDictionary.get(archetype_id).equipment;
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
