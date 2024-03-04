export interface ICountryData {
    country: string;
    countryCode: string;
    region: string;
}

export interface IRegionData {
    [region: string]: [ICountryData];
}