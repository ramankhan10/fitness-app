import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'persianDate',
})
export class PersianDatePipe implements PipeTransform {
  transform(value: Date): string {
    const persianDate = moment(value).locale('fa').format('YYYY/MM/DD');
    return persianDate;
  }
}
