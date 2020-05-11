import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';


@Pipe({name: 'currency'})
export class CustomCurrencyPipe extends CurrencyPipe implements PipeTransform {

  constructor() {
    super('en-GB');
  }

  transform(value: any,
            currencyCode?: string,
            symbolDisplay: boolean | 'code' | 'symbol' | 'symbol-narrow' = 'symbol',
            digits?: string,
            locale?: string): any {
    currencyCode = currencyCode || 'GBP';
    value = value || 0;
    return super.transform(value, currencyCode, symbolDisplay, digits, 'en-GB');
  }
}
