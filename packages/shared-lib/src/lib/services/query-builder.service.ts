import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  getQueryUrl(url: string, params: any): string {
    let qs = 'timestamp=' + new Date().getTime() + '&';
    for (const key in params) {
        const value = params[key];
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + '&';
    }
    if (qs.length > 0) {
        qs = qs.substring(0, qs.length - 1); //chop off last "&"
        url = url + '?' + qs;
    }
    return url;
  }

}
