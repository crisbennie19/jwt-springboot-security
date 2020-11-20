import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  
  constructor( private http: HttpClient, private base:HttpService ) { }

  private _baseUrl = environment.base_api
  
  getMessages(){
    return this.http.get(
      encodeURI(this._baseUrl + 
      `swipe_admin/messages/list`)
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }
   
  createUpdateMessage(body:Message):Observable<Message>{
    return this.http.post<Message>(
      encodeURI(this._baseUrl + 
      `swipe_admin/messages/create-update`), body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }


  deleteMessage(id:number, body){
    return this.http.post(
      encodeURI(this._baseUrl + 
      `swipe_admin/messages/${id}`), body
    )
    .pipe(
      catchError( err => this.errorHandler(err) )
    );
  }


  
  
  errorHandler(error:HttpErrorResponse){
    return Observable.throw(error.message || "Server Error") 
  }
}