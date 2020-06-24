import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DebtcollectionService {

  constructor(private http: HttpClient, private base: HttpService) { }
  private _baseUrl = this.base.baseurl


  getDefaultUserList(page:number,size:number){
    return this.http.get(
      encodeURI(this._baseUrl +
        `swipe_admin/defaultusers/list?page=${page}&size=${size}`)
    ).pipe(
      catchError(err => this.errorHandler(err))
    );
  }


  getDefaultUserListByDateRange(datefrom:string,dateto:string){
    return this.http.get(
      encodeURI(this._baseUrl +
        `swipe_admin/defaultusers/list/by_date_range?from=${datefrom}&to=${dateto}`)
    ).pipe(
      catchError(err => this.errorHandler(err))
    );

  }


  getCreditRepayment(page:number,size:number){
    return this.http.get(
      encodeURI(this._baseUrl +
        `swipe_admin/credit-repayment/list?page=${page}&size=${size}`)
    ).pipe(
      catchError(err => this.errorHandler(err))
    );
  }


  getCreditRepaymentByDateRange(datefrom:string,dateto:string){
    return this.http.get(
      encodeURI(this._baseUrl +
        `swipe_admin/credit-repayment/list/date_range?dateFrom=${datefrom}&dateTo=${dateto}`)
    ).pipe(
      catchError(err => this.errorHandler(err))
    );
  }


  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error")
  }
}
