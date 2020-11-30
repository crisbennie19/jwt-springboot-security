import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/json',
    'Access-Control-Request-Headers': 'access-token,authorization',
    'Authorization':'Bearer a24b31dc-f49b-4407-a661-d487dc105dbb'
  })
};

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {


  constructor( private http: HttpClient, private base:HttpService ) { }

  private _baseUrl = environment.base_api
  
  getTransactions(page:number,size:number){

    return this.http.get(

      this._baseUrl +
      `swipe_admin/list/transactions?page=${page}&size=${size}`
    
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
  getTransactionByAccountholder(search){
    return this.http.get(
      encodeURI(this._baseUrl +
      `swipe_admin/list/transactions/accountholder?search=${search}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getTransactionByDateRange(from,to){
    return this.http.get(
      encodeURI(this._baseUrl +
      `swipe_admin/list/transactions/by_date_range?from=${from}&to=${to}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }



  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error")
  }
}
