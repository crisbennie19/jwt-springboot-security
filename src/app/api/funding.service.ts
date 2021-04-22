import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class FundingService {
  constructor(private http: HttpClient, private base: HttpService) {}

  private _baseUrl = environment.base_api;

  getCustomer(date_from: string, date_to: string, email: string) {
    return this.http
      .get(
        this._baseUrl +
          `okra/transaction/getByCustomerDate?date_from=${date_from}&date_to=${date_to}&email=${email}`
      )
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  getIncome(payload) {
    return this.http
      .post(this._baseUrl + `okra/income/getByCustomer`, payload)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
}
