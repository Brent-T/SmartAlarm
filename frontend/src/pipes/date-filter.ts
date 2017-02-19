import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datefilter'
})
export class DateFilter implements PipeTransform {
  transform(value) {
    var split = value.split('-');

    var year = split[0];
    var month = split[1];
    var day = split[2].substr(0, 2);

    return (day + '/' + month + '/' + year);
  }
}
