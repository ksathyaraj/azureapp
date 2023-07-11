import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, map } from 'rxjs';
import { env } from '../../../environments/environment';

@Injectable()
export class HttpTranslationApi implements TranslateLoader {

    constructor(private http: HttpClient) { }

    getTranslation(lang: string): Observable<any> {
        return this.http.get<httpResponse>(env.serverBaseUrl+`/api/translation/resources?localeId=${lang}`)
                    .pipe(map((response: any) => {
                        return JSON.parse(response);
                    }));
    }   
}



interface httpResponse {
    data: object
  }