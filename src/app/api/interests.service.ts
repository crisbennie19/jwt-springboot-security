import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InterestsService {

   
  constructor( private http: HttpClient, private base:HttpService ) { }

  private _baseUrl = this.base.baseurl

  // Interests list and filters
  getInterests(page:number, size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/interest?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

    getInterestsBalance(page:number, size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/interest_balance?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
  

  getInterestsByAccountholder(search:any){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/interest/accountholder?search=${search}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }


  getInterestsByDateRange(from,to){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/list/interest/by_date_range?from=${from}&to=${to}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  }
}