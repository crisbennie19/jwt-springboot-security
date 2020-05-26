import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { newIssue, issueLog } from '../models/savings.model';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  constructor(private http: HttpClient, private base: HttpService) { }
  private _baseUrl = this.base.baseurl

  issuesOnPlatform() {
    return this.http.get(
      encodeURI(this._baseUrl +
        `issues/list/issue-category`)
    ).pipe(
      catchError(err => this.errorHandler(err))
    );
  }
  getAllIssues(dateFrom: string, dateTo: string) {
    return this.http.get(
      encodeURI(this._baseUrl +
        `issues/list/date-range?dateFrom=${dateFrom}&dateTo=${dateTo}`)
    ).pipe(
      catchError(err => this.errorHandler(err))
    );
  }
  getRangePostedbyEmail(dateFrom: string, dateTo: string, email: string) {
    return this.http.get(
      encodeURI(this._baseUrl +
        `issues/list/date-range-postedbyemail?dateFrom=${dateFrom}&dateTo=${dateTo}&postedbyemail=${email}`)
    ).pipe(
      catchError(err => this.errorHandler(err))
    );
  }
  getIssuesbyUserEmail(email: string) {
    return this.http.get(
      encodeURI(this._baseUrl +
        `issues/list/useremail?initiatoremail=${email}`))
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  getIssuesbyIssueID(id: number) {
    return this.http.get(
      encodeURI(this._baseUrl +
        `issues/log-list/by-issuesid?issueid=${id}`))
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }

  postNewIssueLog(body: issueLog): Observable<issueLog> {
    return this.http.post<issueLog>(
      encodeURI(this._baseUrl +
        `issues/new-issue-log`), body
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }
  postNewIssue(body: newIssue): Observable<newIssue> {
    return this.http.post<newIssue>(
      encodeURI(this._baseUrl +
        `issues/new-issue`), body
    )
      .pipe(
        catchError(err => this.errorHandler(err))
      );
  }


  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error")
  }
}
