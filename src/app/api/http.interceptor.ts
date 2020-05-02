import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private data: DataService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.data.getToken()}`
      }
    });
    return next.handle(request);
  }
}
