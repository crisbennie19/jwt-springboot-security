import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ReferralService {
  constructor( private http: HttpClient, private base:HttpService ) { }

  private _baseUrl = environment.base_api
  
  getReferrals(page:number,size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/refferal/list?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
   
  
  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  }
}