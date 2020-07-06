import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-okra-check',
  templateUrl: './okra-check.component.html',
  styleUrls: ['./okra-check.component.scss']
})
export class OkraCheckComponent implements OnInit {

  constructor(private data: DataService) { } 

  ngOnInit() {
  }

}
