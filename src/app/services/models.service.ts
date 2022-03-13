export class Country {
    name: string;
}

export class DivisionType {
    type: string;
    name: string;
    description: string;
    divisions: Array<number>;
}

export class Division {
    id: number;
    name: string;
    description: string;
    regiments: Array<Regiment>;
    support: Array<SupportCompany>;
    tags: Array<string>;
}

export class Regiment {
    name: string;
    number: number;
}

export class SupportCompany {
    name: string;
}