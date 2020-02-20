import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  constructor( private http: HttpClient, private base:HttpService ) { }

  private _baseUrl = this.base.baseurl

  getWallets(page:number,size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/wallet?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getWalletsBalance(page:number,size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/wallet_balance?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getWalletByAccountholder(search){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/wallet/accountholder?search=${search}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getWalletByDateRange(from,to){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/wallet/by_date_range?from=${from}&to=${to}`)

    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
  
 
  getWalletBalanceByDateRange(from,to){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/wallet_balance/by_date_range?datefrom=${from}&dateto=${to}`)
      
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  
  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  }
}