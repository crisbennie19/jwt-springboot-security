import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-support',
  templateUrl: './view-support.component.html',
  styleUrls: ['./view-support.component.scss']
})
export class ViewSupportComponent implements OnInit {
  loading = false;
  listData: any;
  intListData: any;
  issueTitle: any;
  replyForm = false
  initDescription: any
  initiatoremail: any
  payload: any
  openPanel: boolean = false
  hideShow = true;
  toggle = false
  message:string
  submitMsg:boolean

  emailDisable: boolean = true
  form: FormGroup;


  constructor(private data: DataService, private router: Router, private fb: FormBuilder) {

    this.payload = {
      description: "",
      issuesid: null,
      postedbyemail: "",
      status: ""
    }

    const navigation = this.router.getCurrentNavigation();
    const issues = navigation.extras.state.data as {
      category: string
      closebyemail: string
      closebyname: string
      dateclose: string
      dateposted: string
      description: string
      id: number
      initiatoremail: string
      initiatorphone: string
      issuesLogList: null
      status: string
      ticketid: string
    }
    this.intListData = issues
    this.form = this.fb.group({
      'responseMessage': ['', Validators.required],
      'email': ['']
    })
  }

  ngOnInit() {
    this.getIssuesLog();
    let activeUser = JSON.parse(localStorage.getItem('adminUser'))
    this.form.patchValue({
      'email': activeUser.data.contactemail
    });

  }
  previous(){
    this.router.navigate(['/support'])
  }

  getIssuesLog() {
    this.loading = true
    this.data.supportService.getIssuesbyIssueID(this.intListData.id).subscribe((res: any) => {
      if(res.message=="Success"){
      this.listData = res.data
      this.loading=false
      }else {

      }
      

    });
  }

  supportReply() {
    this.loading = true
    this.payload = {
      description: this.form.get('responseMessage').value,
      issuesid: this.intListData.id,
      postedbyemail: this.form.get('email').value,
      status: this.intListData.status
    }

    this.data.supportService.postNewIssueLog(this.payload).subscribe((res: any) => {
      if(res.message == "Success"){
        this.getIssuesLog();
      this.loading = false
        this.message = res.message
        this.submitMsg=true
      }else{
        this.message = res.message
        this.submitMsg=true
      }

    });
  }
  openAccordion() {
    this.openPanel = true

  }
  closeAccordion() {
    this.openPanel = false
    this.form.patchValue({
      'responseMessage': ''
    });
  }

}
