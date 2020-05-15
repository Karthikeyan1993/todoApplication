import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(value: any, searchTerm: string, key?: string): any {
    if (!value) {
      return [];
    }
    if (!searchTerm) {
      return value;
    }
    if (value.length > 0) {
      const obj = value[0];
      const isArrayOfObjects: boolean = typeof (obj) === 'object';
      if (isArrayOfObjects && !obj.hasOwnProperty(key)) {
        return value;
      }
      return [...value.filter(ele => {
        const val = isArrayOfObjects ? ele[key] : ele;
        return val.toString().toLowerCase().includes(searchTerm.toLocaleLowerCase());
      })];
    } else {
      return [];
    }
  }

}
