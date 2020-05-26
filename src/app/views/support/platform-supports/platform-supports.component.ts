import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-platform-supports',
  templateUrl: './platform-supports.component.html',
  styleUrls: ['./platform-supports.component.scss']
})
export class PlatformSupportsComponent implements OnInit {
//   @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
//   @ViewChild(MatSort,{static: false}) sort: MatSort;

//   searchKey: any = '';
//   loading: boolean;
//   listData:any;
//   intListData:any;
//   issueTitle:any;
//   replyForm = false
//   initDescription:any
//   initiatoremail:any
//   payload :any
//   openPanel:boolean = false
//   hideShow = true;
//   toggle= false

//   tableLength: number;
//   mydata: any;
//   fromdate: any="2020/05/18" ;
//   todate:any="2020/05/24" ;
//   response: any;
//   daterRangeMsg:"No record found for the date range "
  
//   emailDisable:boolean=true
//   form:FormGroup;

//   constructor(private data:DataService,private router: Router,private fb:FormBuilder) {
    
//     this.payload = {
//       description: "",
//       issuesid: null,
//       postedbyemail: "",
//       status: ""
//     }

//     const navigation = this.router.getCurrentNavigation();
 
  
//    this.form = this.fb.group({
//      'responseMessage':['',Validators.required],
//      'email':['']
//    })
//   }

  ngOnInit() {
    // this.getTicketList();
    // this.getIssuesLog();
    // let activeUser = JSON.parse(localStorage.getItem('adminUser') )
    
    // this.form.patchValue({
    //   'email':activeUser.data.contactemail
    // });

  }
//   getTicketList(){
   
//     this.data.supportService.getAllIssues(this.fromdate,this.todate).subscribe((res:any)=>{
      
      
//       //console.log(res.data)
      

//       this.loading = false;
      
//     }, err => {
//       this.loading = false;
    
    
//     })
  

//   }

//   getIssuesLog(){ 
//     this.data.supportService.getIssuesbyIssueID(4).subscribe((res:any)=>{
       
//    console.log(res.data)
//    this.listData = res.data
   
//      });
//   }
 
//   supportReply(){
//     this.payload = {
//       description: this.form.get('responseMessage').value,
//       issuesid: this.intListData.id,
//       postedbyemail: this.form.get('email').value,
//       status:this.intListData.status
//     }
    
//     this.data.supportService.postNewIssueLog(this.payload).subscribe((res:any)=>{
       
//        console.log(res.data)
       
//        this.getIssuesLog();
//         });
//   }
//   openAccordion(){  
//     this.openPanel = true
    
//       }
//       closeAccordion(){
//         this.openPanel = false
//       }

 

 
}
