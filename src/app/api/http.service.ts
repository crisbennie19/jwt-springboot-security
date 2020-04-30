import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  public baseurl = "https://swipe.ng:8443/base_api/"
  constructor() {}
} 