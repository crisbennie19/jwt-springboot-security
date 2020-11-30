import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

  constructor( private http: HttpClient, private base:HttpService ) { }

  private _baseUrl = environment.base_api
  getDashboard(){
    return this.http.get(
      this._baseUrl + 
      `swipe_admin/report/dashboard` 
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  }
   
}
