import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public baseurl = "/api/"
  constructor() {}
}