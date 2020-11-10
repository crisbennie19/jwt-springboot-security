import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-reportmailsend',
  templateUrl: './reportmailsend.component.html',
  styleUrls: ['./reportmailsend.component.scss']
})
export class ReportmailsendComponent implements OnInit {
  mailList:any=[]
  mailInput:FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public list: any, private fb:FormBuilder,private data: DataService) { }
  

  ngOnInit() {
    this.mailInput = this.fb.group({
      'mail':['']
    })
  }
  addMail(){
    // console.log(this.mailInput.get('mail').value)
    this.mailList.push(this.mailInput.get('mail').value)
  }
  sendMail(){
   
  }
  delete(i){
  this.mailList.splice(i,1);
  }
}
