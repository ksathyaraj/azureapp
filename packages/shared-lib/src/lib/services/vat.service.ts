import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import * as moment from 'moment/moment';
@Injectable({
  providedIn: 'root'
})
export class VatService {

  constructor(private dateService: DateService) { }

calculateVat (isVatable:any, vatRate:any, exclusiveAmount:any) {
    return isVatable ? this.roundToMoney((exclusiveAmount * (vatRate / 100))) : 0;
}

round(value:any, decimals:any) {
    //ref: http://www.jacklmoore.com/notes/rounding-in-javascript/
    return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
}

roundToMoney (input:number) {
    return this.round(input, 2);
}

calculateVatFromInclusive (isVatable:any, vatRate:any, inclusiveAmount:any) {
    const exlusiveAmount = isVatable ? (vatRate > 0 ? (inclusiveAmount / (1 + (vatRate / 100))) : inclusiveAmount) : inclusiveAmount;
    return this.calculateVat(isVatable, vatRate, exlusiveAmount);
}

calculateInclusiveAmount (isVatable:any, exclusiveAmount:any, vatAmount:any) {
    return exclusiveAmount + (isVatable ? vatAmount : 0);
}

calculateExclusiveAmount (isVatable:any, inclusiveAmount:any, vatRate:any) {
    return isVatable ? (vatRate > 0 ? (inclusiveAmount / (1 + (vatRate / 100))) : inclusiveAmount) : inclusiveAmount;
}

calculateExclusiveAmountFromInclusiveAndVatAmounts (isVatable:any, inclusiveAmount:any, vatAmount:any) {
    return isVatable ? (inclusiveAmount - vatAmount) : inclusiveAmount;
}

isStandardVatAmount (vatInfo:any, vatDate:any, exclusiveAmt:any, vatAmt:any) {

    const standardVatRateForDate = this.getVatRate(vatInfo, vatDate);
    const vatRate = Math.round(vatAmt / exclusiveAmt * 100);

    console.log('VatService.isStandardVatAmount: ', standardVatRateForDate, vatRate, vatRate === standardVatRateForDate);

    return vatRate === standardVatRateForDate;
}

getVatRate (vatInfo:any, date:any) {
    console.log('VatService.getVatRate date: ', date, vatInfo);
    date = date ? date.length == 10 ? moment(date, "DD/MM/YYYY") : moment(date) : moment();

    if (!vatInfo) return 0;

    if (!vatInfo.vatRateItems || vatInfo.vatRateItems.length == 0) {
        return vatInfo.vatRate;
    }

    const items = vatInfo.vatRateItems.filter(function (i:any) {
        return moment(i.effectiveFrom) <= date
    }).sort(function (a:any, b:any) {
        const effectiveFrom_a:any= moment(a.effectiveFrom).format('YYYYMMDD');
        const effectiveFrom_b:any= moment(b.effectiveFrom).format('YYYYMMDD');

        return effectiveFrom_a-effectiveFrom_b;
    }).reverse();
    
    return items[0].vatRate;
}

}
