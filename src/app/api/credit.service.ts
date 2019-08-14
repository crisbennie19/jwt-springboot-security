import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  constructor( private http: HttpClient, private base:HttpService ) { }

  private _baseUrl = this.base.baseurl

  getCredits(page:number,size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/credit/list?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getCreditRequests(page:number,size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/credit_request/history?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  UpdateCreditRequest(comment:string,id:number, status:boolean, body){
    return this.http.post(
      encodeURI(this._baseUrl + 
      `swipe_admin/credit_request/update?comment=${comment}&requestid=${id}&status=${status}`),
    body)
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  previewBankStatement(id:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/preview/account_statement?requestid=${id}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
   
  
  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  }
}