export class Division {
    id: number;
    name: string;
    type: string;
	hp: number;
	organization: number;
	soft_attack: number;
	hard_attack: number;
	piercing: number;
	defense: number;
	breakthrough: number;
	air_attack: number;
	hardness: number;
	cost: number;
	width: number;
	armor: number;
	fuel_usage: number;

	constructor(id: number, name: string, type: string, hp: number, organization: number, soft_attack: number, hard_attack: number,
		piercing: number, defense: number, breakthrough: number, air_attack: number, hardness: number, cost: number, width: number, 
		armor: number, fuel_usage: number) {
			this.id = id;
			this.name = name;
			this.type = type;
			this.hp = hp;
			this.organization = organization;
			this.soft_attack = soft_attack;
			this.hard_attack = hard_attack;
			this.piercing = piercing;
			this.defense = defense;
			this.breakthrough = breakthrough;
			this.air_attack = air_attack;
			this.hardness = hardness;
			this.cost = cost;
			this.width = width;
			this.armor = armor;
			this.fuel_usage;
		}
}