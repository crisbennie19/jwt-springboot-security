import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'swipe';

  canAccess:boolean

  constructor( private data:DataService){
    this.data.isLoggedin.subscribe(access => this.canAccess = access)
  }
}
