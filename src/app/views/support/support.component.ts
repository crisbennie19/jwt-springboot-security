import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  constructor(private data:DataService) { }

  ngOnInit() {
    this.getSupportCategory();
  }

  

  getSupportCategory(){
    this.data.supportService.issuesOnPlatform().subscribe((res)=>{
      
    })
  }

}
