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

  getCreditByDateRange(from: string, to: string){
    return this.http.get(
      encodeURI(this._baseUrl +
        `swipe_admin/credit/list/date_range?from=${from}&to=${to}`
        )
    )
  }
 creditCheckPerformance(){
   let bvns= '22363225076'
   return this.http.get(
     encodeURI(this._baseUrl+
      `credit_check/verify_performance?bvn=${bvns}`
      )
   )
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

  getCreditRequestsApprove(){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/credit_request/approve`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getCreditRequestsApproveByDateRange(from:string, to:string){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/credit_request/approve/by_date_range?from=${from}&to=${to}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
  
  getCreditRequestsAwaitApproval(){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/credit_request/await_approve`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getCreditRequestsAwaitApprovalByDateRange(from:string, to:string){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/credit_request/await_approve/by_date_range?from=${from}&to=${to}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getCreditRequestsAwaitReview() {
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/credit_request/await_review`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getCreditRequestsAwaitReviewByDateRange(from:string, to:string){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/credit_request/await_review/by_date_range?from=${from}&to=${to}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  // /credit_request/history?page=1&size=100
  getCreditRequestHistory(page:number, size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/credit_request/history?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err))
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