import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SupportService {
  constructor(private http: HttpClient, private base: HttpService) { }

  private _baseUrl = this.base.baseurl

  getSupportByCharges(category:string,dateFrom: String, dateTo: String, param: String) {
    return this.http.get(
      encodeURI(this._baseUrl +
        `support/list/${category}?datefrom=${dateFrom}&dateto=${dateTo}&searchparam=${param}`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }
  


  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error")
  }
}
