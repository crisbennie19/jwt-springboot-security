import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CardService {

  constructor( private http: HttpClient, private base:HttpService ) { }

  private _baseUrl = this.base.baseurl

  getCards(page:number,size:number){
    return this.http.get(
      this._baseUrl + 
      `swipe_admin/card/list?page=${page}&size=${size}` 
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getCardsByDateRange(from:string, to:string){
    return this.http.get(
      this._baseUrl + 
      `swipe_admin/card/list/date_range?from=${from}&to=${to}` 
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
  
   
  activateCard(id:number,body){
    return this.http.post(
      encodeURI(this._baseUrl + 
      `swipe_admin/card/activate?accountid=${id}`),body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  deactivateCard(id:number, body){
    return this.http.post(
      encodeURI(this._baseUrl + 
      `swipe_admin/card/deactivate?accountid=${id}`), body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  terminateCard(bin:any){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/card/terminate?bin=${bin}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  }
}