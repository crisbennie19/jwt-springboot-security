import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditIssuanceService {

  constructor(private http: HttpClient, private base: HttpService) { }
  private _baseUrl = this.base.baseurl

getCreditIssuance(page:number, size:number){
  return this.http.get(
    encodeURI(this._baseUrl + 
    `swipe_admin/credit-issuance/list?page=${page}&size=${size}`)
  )
  .pipe(
    catchError( err => this.errorHandler(err))
  );

}

errorHandler(error:HttpErrorResponse){
  return Observable.throw(error.message || "Server Error") 
}
}
