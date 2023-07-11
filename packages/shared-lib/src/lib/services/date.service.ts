import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {


  defaultDatePickerDateFormat = 'DD/MM/YYYY';
  defaultDateTimeFormat = 'DD/MM/YYYY HH:mm:ss';
  defaultWebApiDateFormat = 'DD MMM YYYY';
  defaultMonthYearDateFormat = 'MMMM YYYY';

  getMomentDate(input: string | moment.Moment, inputFormat?: string): moment.Moment {
      moment.locale('en-GB');//for now we're forcing working with date in United Kingdom English locale

      //first if a moment date is passed in, pass it right back out
      if (input && moment.isMoment(input)) {
          return input;
      }
      

      //second if a format is specified use this format to create a moment date
      if (inputFormat) {
          const m = moment(input, inputFormat);
          if (m.isValid()) return m;
      }

      //if a format is not specified for a moment date could not be created using the specified format, then use a vanilla javascript Date to create a moment
      const m = moment(input);
      if (m.isValid()) {
          return m;
      }

      //finally is all else fails, try creating a moment using our defaultDatePickerDateFormat
      return moment(input, this.defaultDatePickerDateFormat);
  }

  getDefaultFromDate(): string {
      return moment().startOf('month').subtract(1, 'month').format(this.defaultDatePickerDateFormat);// jshint ignore:line
  }

  getDefaultToDate(): string {
      return moment().endOf('month').format(this.defaultDatePickerDateFormat);// jshint ignore:line
  }

  getDefaultStartOfYear(): string {
      return moment("01-01-" + (new Date()).getFullYear(), "MM-DD-YYYY").format(this.defaultDatePickerDateFormat);
  }

  getDefaultEndOfYear(): string {
      return moment("12-31-" + (new Date()).getFullYear(), "MM-DD-YYYY").format(this.defaultDatePickerDateFormat);// jshint ignore:line
  }

  getFormattedDateForWebApi(date: string | moment.Moment, format?: string): string {
      format = format || this.defaultDatePickerDateFormat;
      return date
          ? this.getMomentDate(date, format).format(this.defaultWebApiDateFormat) // jshint ignore:line
          : '';
  }

  getFormattedMoment(date: string | moment.Moment) : string {
      return this.getMomentDate(date, this.defaultDatePickerDateFormat).format(this.defaultDatePickerDateFormat);
  }

  getTodaysDate(): string {
      return moment().format(this.defaultDatePickerDateFormat);
  }
  
  getFormattedMonthYearDate(date: string | moment.Moment): string {
      return this.getMomentDate(date).format(this.defaultMonthYearDateFormat);
  }

  addMonths(date: string | moment.Moment,numberOfMonths: number): moment.Moment {
      return this.getMomentDate(date).add(numberOfMonths, 'months');
  }

  getStartOfMonth(date: string | moment.Moment): moment.Moment {
      return this.getMomentDate(date).startOf('month');
  }

  getMonthNumber(date: moment.Moment): string {
      return date.format('M');
  }

  isValidDate(date: string | moment.Moment, format: string): boolean {
      return date !=null && date != undefined && this.getMomentDate(date, format).isValid();
  }

  isVatChangeDate(): boolean
  {
      const vatChangeDate = moment("01/04/2018 00:00:00", "DD/MM/YYYY HH:mm:ss");
      const formattedVatChangeDate = this.getMomentDate(vatChangeDate,);

      console.log('today: ', moment());
      console.log('formattedVatChangeDate: ', formattedVatChangeDate);
      console.log('(today > formattedVatChangeDate) = isVatChangeDate: ', moment() > formattedVatChangeDate);

      return moment() > formattedVatChangeDate;
  }
}
