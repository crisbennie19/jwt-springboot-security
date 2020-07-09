import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CashoutReminderService {

  constructor(private http: HttpClient, private base: HttpService) { }
  private _baseUrl = this.base.baseurl

  getDailySavings(){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `daily_saving/list`)
    )
    .pipe(
      catchError( err => this.errorHandler(err))
    );
  }
  
  getDailySavingsByDate(targetDate:string){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `daily_saving/list/target?targetdate=${targetDate}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err))
    );
  }
  getDailySavingsByDay(day:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `daily_saving/list/saving/notification?days=${day}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err))
    );
  }





  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  }
}
