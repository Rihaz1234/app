import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {

  constructor() { }

  convertCtoF(value): number {
    return Math.round(value * 18 + 320) / 10;
  }

  convertFtoC(value): number {
    return Math.round((value - 32) / 0.18) / 10;
  }

  convertInchToCm(value): string {
    return (value * 2.54).toFixed(1);
  }

  convertCmToInch(value): string {
    return (value / 2.54).toFixed(1);
  }

  convertKgToPound(value): string {
    return (value * 2.20462262185).toFixed(1);
  }

  convertPoundToKg(value): string {
    return (value / 2.20462262185).toFixed(1);
  }

  getUserTimeZone(): string {
    let preference = JSON.parse(sessionStorage.getItem('userPreference'));
    return preference?.timeZone;
  }

  getUserUnitSystem(): string {
    let preference = JSON.parse(sessionStorage.getItem('userPreference'));
    return preference?.units;
  }

  getUserWeightUnit(): string {
    let preference = JSON.parse(sessionStorage.getItem('userPreference'));
    return (preference?.units === 'IS') ? 'POUND' : 'KG';
  }

  getUserHeightUnit(): string {
    let preference = JSON.parse(sessionStorage.getItem('userPreference'));
    return (preference?.units === 'IS') ? 'INCH' : 'CM';
  }

  getUserTempUnit(): string {
    let preference = JSON.parse(sessionStorage.getItem('userPreference'));
    return (preference?.units === 'IS') ? 'F' : 'C';
  }

}
