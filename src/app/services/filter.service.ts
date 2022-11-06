import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  toURL(form?: any): string {
    if (!form) {
      return '';
    }
    let str = '';
    for (let name of Object.keys(form)) {
      const data = form[name];
      if (typeof (data) === 'undefined' || data === null || data.length === 0) {
        continue;
      } else if (typeof (data) === 'object' && data['id'] !== undefined) {
        str = str + `&${name}=${data['id']}`;
        continue;
      }
      str = str + `&${name}=${data}`;
    }
    return str;
  }

}
