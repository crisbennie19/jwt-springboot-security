import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor( private http: HttpClient, private base:HttpService ) { }

  private _baseUrl = this.base.baseurl

  // login

  loginAdmin(body:any){
    return this.http.post(
      encodeURI(this._baseUrl + 
      `entrance/signin/admin`), body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  loginOutAdmin(id,body:any){
    return this.http.post(
      encodeURI(this._baseUrl + 
      `entrance/logout?accountid=${id}`), body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }


  

  getAdminUsers(page:number,size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/user/list?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  getUsers(page:number,size:number){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/user/list?page=${page}&size=${size}`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

   
  createAdminUser(body:AdminUser,roles):Observable<AdminUser>{
    return this.http.post<AdminUser>(
      encodeURI(this._baseUrl + 
      `swipe_admin/user/create?roles=${roles}`), body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  disableUser(id:number,body){
    return this.http.post(
      encodeURI(this._baseUrl + 
      `swipe_admin/user/disable/${id}`), body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  
  getUserRoles(){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/roles/list`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }

  changePassword(accountid,newpassword,oldpassword,data): Observable<any> {
    return this.http.post<any>(this._baseUrl + `setting/change/password?accountid=${accountid}&newpassword=${newpassword}&oldpassword=${oldpassword}`, data)
    .pipe(
      catchError( err =>  this.errorHandler(err))
    )
  }
  

  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  }
}