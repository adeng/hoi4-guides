export class Archetype {
    archetype_id: string;
    archetype_name: string;
    equipment: Array<Equipment>;
}

export class Equipment {
    equipment_id: string;
    equipment_name: string;
    year: number;
    reliability: number;
    max_speed: number;
    defense: number;
    breakthrough: number;
    soft_attack: number;
    hard_attack: number;
    piercing: number;
    air_attack: number;
    hardness: number;
    fuel_consumption: number;
    cost: number;
    armor: number;
}