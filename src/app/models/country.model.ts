export class Country {
    tag: string;
    country_name: string;
    color: string;
}

export class CountryFlag {
    flag_name: string;
    bitmap: string;
    size: string;
}

export class CountryGuide {
    tag: string;
    difficulty: string;
    flag_name: string;
    tags: Array<string>;
    strategies: Array<CountryStrategy>;
}

// export class CountryResearch {
//     name: string;
//     required: string;
// }

export class PoliticalPower {
    type: string;
    name: string;
}

export class Construction {
    type: string;
    year: string;
}

export class Production {
    name: string;
    type: string;
    category: string;
    number: number;
}

export class Conflict {
    header: string;
    text: string;
}

export class CountryStrategy {
    name: string;
    description: string;
    flag_name: string;
    focuses: Array<string>;
    focuses_description: string;
    research: Array<string>;
    research_description: string;
    political_power: Array<PoliticalPower>;
    political_power_description: string;
    construction: Array<Construction>;
    construction_description: string;
    production: Array<Production>;
    production_description: string;
    allies: Array<string>;
    allies_description: string;
    enemies: Array<string>;
    enemies_description: string;
}