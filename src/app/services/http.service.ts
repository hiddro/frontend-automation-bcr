import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IMantenimiento } from '../interfaces/mantenimiento';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) { }

  generateReport(mantenimiento: IMantenimiento): Observable<Blob> {

    let headers = new HttpHeaders();

    headers.set('content-type', 'application/json');
    headers.set('Accept', 'application/pdf');

    let requestOptions = { headers: headers, responseType: 'blob' as 'json' };

    return this.http.post<Blob>("http://localhost:8081/api/bcr/report", mantenimiento, requestOptions);
  }
}
