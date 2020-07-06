import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwipebalanceService {

  constructor(private http: HttpClient, private base: HttpService) { }

  private _baseUrl = this.base.baseurl

  getMonifyBalance(){
    return this.http.get(
      encodeURI(this._baseUrl +
        `balance/monifybalance`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }
  getPaystackBalance(){
    return this.http.get(
      encodeURI(this._baseUrl +
        `balance/paystackbalance`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error")
  }
}
