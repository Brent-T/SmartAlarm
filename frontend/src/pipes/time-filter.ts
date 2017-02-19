import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timefilter'
})
export class TimeFilter implements PipeTransform {
  transform(value) {
    var split = value.split(':');

    var hours = split[0].substr(split[0].length-2);
    var minutes = split[1];

    return (hours + ':' + minutes);
  }
}
