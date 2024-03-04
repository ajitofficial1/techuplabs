import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppConstant } from '../_constants/app-constatns';
import { ICountryData, IRegionData } from '../_models/common';

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  constructor(private http: HttpClient) { }

  getCountries() {
    //Due to CORS error ,Used the static JSON file.
    // return this.http
    //   .get<any>(AppConstant.baseUrl + AppConstant.endPoints.countries)
    return this.http
      .get<any>(`assets/staticdata/countries.json`)
      .pipe(
        map((response: any) => {
          return this.groupByRegion(response.data);
        })
      );
  }

  private groupByRegion(data: { [countryCode: string]: ICountryData }): IRegionData {
    const groupedData: (IRegionData | any) = {};

    for (const countryCode in data) {
      const countryData = data[countryCode];
      const region = countryData.region;

      if (!groupedData[region]) {
        groupedData[region] = [];
      }
      countryData.countryCode = countryCode;
      groupedData[region].push(countryData);
    }
    return groupedData;
  }
}




