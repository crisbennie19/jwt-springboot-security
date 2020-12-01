import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
})

@Injectable({
  providedIn: 'root'
})

export class ReportService {

  constructor(private http: HttpClient, private base: HttpService) { }
  private _baseUrl = environment.base_api
  
  ////////////////////////////////////// Credit card reports //////////////////////////////////

  getDailyCreditReport(day, month, year) {
    return this.http.get(this._baseUrl +
      `reports/daily/creditcard?report_day=${day}&report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }
   

  getWeeklyCreditReport(month, year) {
    return this.http.get(this._baseUrl +
      `reports/weeklycreditcard?report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getQuarterlyCreditReport(endDate, year, startDate) {
    return this.http.get(this._baseUrl +
      `reports/quarterlly/creditcard?end_date=${endDate}&q_year=${year}&start_date=${startDate}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlyCreditReport(year) {
    return this.http.get(this._baseUrl +
      `reports/yearllycreditcard?report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  // Download Report Attachment////
  getDailyCreditReportAttachment(page, day, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/dailycreditcard/downlaod?page=${page}&report_day=${day}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getWeeklyCredictAttachment(page, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/weeklycredicard/downlaod?page=${page}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
     

  }

  getQuartelyCreditReportAttachment(end_day, page, year, type, size, start_day) {
    return this.http.get(this._baseUrl +
      `reports/quarterllycreditcard/downlaod?end_day=${end_day}&page=${page}&report_year=${year}&reporttype=${type}&size=${size}&start_day=${start_day}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlyCreditReportAttachment(page, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/yearllycreditcard/downlaod?page=${page}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  //Send report Attachment By Email
  postDailycreditcardReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/dailycreditcard/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postWeeklycreditcardReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/weeklycreditcard/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postQuartelycreditcardReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/quarterllycreditcard/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postYearlycreditcardReportSendByEmail(body) {
    return this.http.get(this._baseUrl +
      `reports/yearllycreditcard/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

 //////////////////////////////////////// Wallet reports ///////////////////////////////////

  getDailyWalletReport(day, month, year) {
    return this.http.get(this._baseUrl +
      `reports/daily/wallet?report_day=${day}&report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getWeeklyWalletReport(month, year) {
    return this.http.get(this._baseUrl +
      `reports/weeklywallet?report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getQuarterlyWalletReport(endDate, year, startDate) {
    return this.http.get(this._baseUrl +
      `reports/quarterlly/wallet?end_date=${endDate}&q_year=${year}&start_date=${startDate}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlyWalletReport(year) {
    return this.http.get(this._baseUrl +
      `reports/yearllywallet?report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  // Download Report Attachment////
  getDailyWalletReportAttachment(page, day, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/dailywallet/downlaod?page=${page}&report_day=${day}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}`
      ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getWeeklyWalletReportAttachment(page, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/weeklywallet/downlaod?page=${page}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getQuartelyWalletReportAttachment(end_day, page, year, type, size, start_day) {
    return this.http.get(this._baseUrl +
      `reports/quarterllywallet/downlaod?end_day=${end_day}&page=${page}&report_year=${year}&reporttype=${type}&size=${size}&start_day=${start_day}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlyWalletReportAttachment(page, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/yearllywallet/downlaod?page=${page}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  //Send report Attachment By Email
  postDailyWalletReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/dailywallet/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postWeeklyWalletReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/weeklywallet/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postQuartelyWalletReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/quarterllywallet/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postYearlyWalletReportSendByEmail(body) {
    return this.http.get(this._baseUrl +
      `reports/yearllywallet/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }


  ////////////////////////////////////// Savings Reports /////////////////////////////////

  getDailySavingsReport(day, month, year) {
    return this.http.get(this._baseUrl +
      `reports/daily/savingslog?report_day=${day}&report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getWeeklySavingsReport(month, year) {
    return this.http.get(this._baseUrl +
      `reports/weeklysavingslog?report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getQuarterlySavingsReport(endDate, year, startDate) {
    return this.http.get(this._baseUrl +
      `reports/quarterlly/savingslog?end_date=${endDate}&q_year=${year}&start_date=${startDate}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlySavingsReport(year) {
    return this.http.get(this._baseUrl +
      `reports/yearllysavingslog?report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  // Download Report Attachment////
  getDailySavingsAttachment(page, day, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/savingslog/downlaod?page=${page}&report_day=${day}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}`,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getWeeklySavingsAttachment(page, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/weeklysavingslog/downlaod?page=${page}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}`,
      {headers:headers, responseType: 'blob' as 'json'})
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getQuartelySavingsReportAttachment(end_day, page, year, type, size, start_day) {
    return this.http.get(this._baseUrl +
      `reports/quarterllysavingslog/downlaod?end_day=${end_day}&page=${page}&report_year=${year}&reporttype=${type}&size=${size}&start_day=${start_day}`,
      {headers:headers, responseType: 'blob' as 'json'})
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlySavingsReportAttachment(page, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/yearllysavingslog/downlaod?page=${page}&report_year=${year}&reporttype=${type}&size=${size}`,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  //Send report Attachment By Email
  postDailySavingsReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/dailysavingslog/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postWeeklySavingsReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/weeklysavingslog/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postQuartelySavingsReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/quarterllysavingslog/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postYearlySavingsReportSendByEmail(body) {
    return this.http.get(this._baseUrl +
      `reports/yearllysavingslog/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }



  ///////////////////////////////// Transaction ////////////////////////////////////

  getDailyTransactionReport(day, month, year) {
    return this.http.get(this._baseUrl +
      `reports/daily/transaction?report_day=${day}&report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getWeeklyTransactionReport(month, year) {
    return this.http.get(this._baseUrl +
      `reports/weeklytransaction?report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getQuarterlyTransactionReport(endDate, year, startDate) {
    return this.http.get(this._baseUrl +
      `reports/quarterlly/transaction?end_date=${endDate}&q_year=${year}&start_date=${startDate}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlyTransactionReport(year) {
    return this.http.get(this._baseUrl +
      `reports/yearllytransaction?report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  // Download Report Attachment////
  getDailyTransactionAttachment(page, day, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/dailytransaction/downlaod?page=${page}&report_day=${day}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getWeeklyTransactionAttachment(page, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/weeklytransaction/downlaod?page=${page}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getQuartelyTransactionReportAttachment(end_day, page, year, type, size, start_day) {
    return this.http.get(this._baseUrl +
      `reports/quarterllytransction/downlaod?end_day=${end_day}&page=${page}&report_year=${year}&reporttype=${type}&size=${size}&start_day=${start_day}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlyTransactionReportAttachment(page, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/yearllytransaction/downlaod?page=${page}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  //Send report Attachment By Email
  postDailyTransactionReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/dailytransaction/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postWeeklyTransactionReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/weeklytransaction/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postQuartelyTransactionReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/quarterllytransaction/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postYearlyTransactionReportSendByEmail(body) {
    return this.http.get(this._baseUrl +
      `reports/yearllytransaction/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  ///////////////////////// Interest Reports //////////////////////////////////////

  getDailyInterestReport(day, month, year) {
    return this.http.get(this._baseUrl +
      `reports/daily/interest?report_day=${day}&report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getWeeklyInterestReport(month, year) {
    return this.http.get(this._baseUrl +
      `reports/weeklyinterest?report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getQuarterlyInterestReport(endDate, year, startDate) {
    return this.http.get(this._baseUrl +
      `reports/quarterlly/interest?end_date=${endDate}&q_year=${year}&start_date=${startDate}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlyInterestReport(year) {
    return this.http.get(this._baseUrl +
      `reports/yearllyinterest?report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  // Download Report Attachment////
  getDailyInterestAttachment(page, day, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/dailyinterest/downlaod?page=${page}&report_day=${day}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getWeeklyInterestAttachment(page, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/weeklyinterest/downlaod?page=${page}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getQuartelyInterestReportAttachment(end_day, page, year, type, size, start_day) {
    return this.http.get(this._baseUrl +
      `reports/quarterllyinterest/downlaod?end_day=${end_day}&page=${page}&report_year=${year}&reporttype=${type}&size=${size}&start_day=${start_day}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlyInterestReportAttachment(page, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/yearllyinterest/downlaod?page=${page}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  //Send report Attachment By Email
  postDailyInterestReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/dailyinterest/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postWeeklyInterestReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/weeklyinterest/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postQuartelyInterestReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/quarterllyinterest/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postYearlyInterestReportSendByEmail(body) {
    return this.http.get(this._baseUrl +
      `reports/yearllyinterest/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  //////////////////////////// VCard Reports ///////////////////////////////////////////////

  getDailyVCardReport(day, month, year) {
    return this.http.get(this._baseUrl +
      `reports/daily/vcard?report_day=${day}&report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getWeeklyVCardReport(month, year) {
    return this.http.get(this._baseUrl +
      `reports/weeklyvcard?report_month=${month}&report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getQuarterlyVCardReport(endDate, year, startDate) {
    return this.http.get(this._baseUrl +
      `reports/quarterlly/vcard?end_date=${endDate}&q_year=${year}&start_date=${startDate}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlyVCardReport(year) {
    return this.http.get(this._baseUrl +
      `reports/yearllyvcard?report_year=${year}`)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  // Download Report Attachment////
  getDailyVCardAttachment(page, day, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/dailyvcard/downlaod?page=${page}&report_day=${day}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getWeeklyVCardAttachment(page, month, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/weeklyvcard/downlaod?page=${page}&report_month=${month}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getQuartelyVCardReportAttachment(end_day, page, year, type, size, start_day) {
    return this.http.get(this._baseUrl +
      `reports/quarterllyvcard/downlaod?end_day=${end_day}&page=${page}&report_year=${year}&reporttype=${type}&size=${size}&start_day=${start_day}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getYearlyVCardReportAttachment(page, year, type, size) {
    return this.http.get(this._baseUrl +
      `reports/yearllyvcard/downlaod?page=${page}&report_year=${year}&reporttype=${type}&size=${size}` ,
      {headers:headers, responseType: 'blob' as 'json'}
      )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  //Send report Attachment By Email
  postDailyVCardReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/dailyvcard/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postWeeklyVCardReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/weeklyvcard/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postQuartelyVCardReportSendByEmail(body) {
    return this.http.post(this._baseUrl +
      `reports/quarterllyvcard/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postYearlyVCardReportSendByEmail(body) {
    return this.http.get(this._baseUrl +
      `reports/yearllyvcard/attachement`, body)
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error")
  }
}
