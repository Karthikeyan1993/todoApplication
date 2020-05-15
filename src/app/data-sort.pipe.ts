import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dataSort'
})
export class DataSortPipe implements PipeTransform {

  transform(value: any, orderBy: string, key?: string): any {
    if (!value) {
      return [];
    }
    if (value.length > 0) {
      const obj = value[0];
      const isArrayOfObjects: boolean = typeof (obj) === 'object';
      const direction = orderBy === 'asc' ? -1 : 1;
      return [...value.sort((a, b) => {
        const val1 = isArrayOfObjects ? a[key] : a;
        const val2 = isArrayOfObjects ? b[key] : b;
        if (typeof val1 === 'string') {
          return val1 > val2 ? direction * -1 : direction * 1;
        } else if (typeof val1 === 'number') {
          return val1 - val2 > 0 ? direction * -1 : direction * 1;
        }
      })]
    } else {
      return []
    }
  }

}
