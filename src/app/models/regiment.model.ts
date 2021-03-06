export class Regiment {
    regiment_id: string;
    regiment_name: string;
    hp: number;
    organization: number;
    width: number;
    priority: number;
    equipment: Array<ArchetypeNeed>;
    type: string;
    same_support_type: string;
}

export class ArchetypeNeed {
    archetype_id: string;
    archetype_name: string;
    number: number;
}

export class TerrainModifier {
    terrain: string;
    regiments: Array<RegimentTerrainModifier>;
}

export class RegimentTerrainModifier {
    regiment_id: string;
    attack: number;
    defense: number;
    movement: number;
}