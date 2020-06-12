import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Interest, Savingstype } from '../models/savings.model';

@Injectable({
  providedIn: 'root'
})

export class SavingsService {
  
  constructor( private http: HttpClient, private base:HttpService ) { }

  private _baseUrl = this.base.baseurl

  // Savings list and filters
  getSavings(page:number, size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/v2/list/savings?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getSavingsBalance(page:number, size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/v2/list/savings_balance?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getSavingsBalanceByDateRange(fromDate:string, toDate:string){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/v2/list/savings_balance/by_date_range?from=${fromDate}&to=${toDate}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getSavingsByAccountholder(person){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/v2/list/savings/accountholder?person=${person}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getSavingsByType(type){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/v2/list/savings/type?type=${type}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getSavingsByCategory(category){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/v2/list/savings/category?category=${category}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getSavingsByDateRange(from, to){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/v2/list/savings/date_range?from=${from}&to=${to}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
  // Savings list and filters end

  getSavingsInterest(){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/savinginterest/list`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
   
  createUpdateSavingsInterest(body:Interest):Observable<Interest>{
    return this.http.post<Interest>(
      encodeURI(this._baseUrl + 
      `swipe_admin/savinginterest/create-update`), body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  
  getSavingsType(){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/savingstype/list/`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
   
  getSavingsTypeById(id){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/savingtype/${id}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
   
  createUpdateSavingsType(body:Savingstype):Observable<Savingstype>{
    return this.http.post<Savingstype>(
      encodeURI(this._baseUrl + 
      `swipe_admin/savingtype/create-update`), body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  deleteSavingType(id:number, body){
    return this.http.post(
      encodeURI(this._baseUrl + 
      `swipe_admin/savingtype/delete/${id}`), body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  }
}