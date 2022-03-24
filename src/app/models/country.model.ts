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

export class CountryResearch {
    name: string;
    required: string;
}

export class CountryStrategy {
    name: string;
    description: string;
    flag_name: string;
    focuses: Array<string>;
    research: Array<CountryResearch>;
    allies: Array<string>;
    allies_description: string;
    enemies: Array<string>;
    enemies_description: string;
}