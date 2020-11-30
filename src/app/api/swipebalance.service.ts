import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwipebalanceService {

  constructor(private http: HttpClient, private base: HttpService) { }

  private _baseUrl = environment.base_api
  
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
  getFlutterBalance(){
    return this.http.get(
      encodeURI(this._baseUrl +
        `balance/flutterBalance`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getAirvendBalance(){
    return this.http.get(
      encodeURI(this._baseUrl +
        `balance/airvendbalance`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error")
  }
}
