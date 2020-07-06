import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OkraService {

  constructor(private http: HttpClient, private base: HttpService) { }

  private _baseUrl = this.base.baseurl


  getAccount_status(userid:number){
    return this.http.get(
      encodeURI(this._baseUrl +
        `okra/account_status?accountid=${userid}`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getAuthByDateRange(dateFrom: String, dateTo){
    return this.http.get(
      encodeURI(this._baseUrl +
        `okra/auth/by_date_range?date_from=${dateFrom}&date_to=${dateTo}`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getAuthByCustomer(userid:number){
    return this.http.get(
      encodeURI(this._baseUrl +
        `okra/auth/customer?customer_id=${userid}`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getAuthByBank(bank:string){
    return this.http.get(
      encodeURI(this._baseUrl +
        `okra/auth/getByBank?bank=${bank}`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getBalanceByCustomer(customer:string){
    return this.http.get(
      encodeURI(this._baseUrl +
        `okra/balance/getByCustomer?customer=${customer}`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getCustomerIdentity(customer:string){
    return this.http.get(
      encodeURI(this._baseUrl +
        `okra/identity/getByCustomer?customer=${customer}`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }


  getCustomerIncome(customer:string){
    return this.http.get(
      encodeURI(this._baseUrl +
        `okra/income/getByCustomer?customer=${customer}`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  processIncome(customer:string){
    return this.http.get(
      encodeURI(this._baseUrl +
        `okra/products/income/process?customer=${customer}`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

getTransactionByCustomerWithDateRange(customer:string, dateFrom: String, dateTo){
    return this.http.get(
      encodeURI(this._baseUrl +
        `okra/transaction/getByCustomerDate?customer=${customer}&date_from=${dateFrom}&date_to=${dateTo}`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getSpendingHabit(customer:string){
    return this.http.get(
      encodeURI(this._baseUrl +
        `okra/transaction/spending-habit/getByCustomer?customer=${customer}`)
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }







  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error")
  }
}
