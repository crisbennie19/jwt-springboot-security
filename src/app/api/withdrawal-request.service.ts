import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalRequestService {
  constructor( private http: HttpClient, private base:HttpService ) { }

  private _baseUrl = environment.base_api

  
   
  getWithdrawalList(page:number,size:number){
    return this.http.post(
      this._baseUrl + 
      `swipe_admin/withdrawal/request?page=${page}&size=${size}`,{}
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
  getWithdrawal_aprove_decline(body){
    return this.http.post(
      this._baseUrl + 
      `swipe_admin/withdrawal/approve_decline`,body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getWithdrawlByDate(date:string){
    return this.http.post(
      this._baseUrl + 
      `swipe_admin/withdrawal/request/bydate?request_date=${date}`,{})

    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
 
  getWithdrawalByEmail(date:string){
    return this.http.post(
      this._baseUrl + 
      `swipe_admin/withdrawal/request/byemail?email=${date}`,{})
      
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
  
  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  }
  

}