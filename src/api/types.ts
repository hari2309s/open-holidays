export enum PublicHolidayQuality {
    MANDATORY = 'Mandatory',
}

export enum HolidayType {
    PUBLIC = 'Public',
    SCHOOL = 'School',
}

export interface ICountry {
    isoCode: string;
    name: Array<{ language: string; text: string }>;
    officialLanguages: string[];
}

export interface IPublicHolidaysRequestPayload {
    countryIsoCode: string;
    languageIsoCode?: string;
    validFrom: string;
    validTo: string;
    subdivisionCode?: string;
}

export interface IPublicHoliday {
    comment: Array<{ language: string; text: string }>;
    endDate: string;
    id: string;
    name: Array<{ language: string; text: string }>;
    nationwide: boolean;
    quality: PublicHolidayQuality;
    startDate: string;
    subdivisions: Array<{ code: string; shortName: string }>;
    type: HolidayType.PUBLIC;
}
