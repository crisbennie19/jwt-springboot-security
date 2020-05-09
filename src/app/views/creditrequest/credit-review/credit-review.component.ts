import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { CreditCheckComponent } from '../credit-check/credit-check.component';
import { CreditAccountStatementComponent } from '../credit-account-statement/credit-account-statement.component';
import { CreditRequestHistoryComponent } from '../credit-request-history/credit-request-history.component';
import { UsersViewComponent } from '../../users/users-view/users-view.component';
import { UserReportComponent } from '../../users/user-report/user-report.component';
import { CreditBureauComponent } from '../credit-bureau/credit-bureau.component';

@Component({
  selector: 'app-credit-review',
  templateUrl: './credit-review.component.html',
  styleUrls: ['./credit-review.component.scss']
})
export class CreditReviewComponent implements OnInit {
 
  @Input() row:number;
  creditData:{};
  public userPerformance: any = '';
  loading: boolean;
  creditCheckMsg:boolean
  selecdtedAction: any = '';
  comment: any = '';
  public formModel:any = {};
  doc: any = `data:image/png;base64, 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`
  

  creditReviewForm:FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) private  selectedRequest:any,
    private dialogRef: MatDialogRef<CreditReviewComponent>,
    private formBuilder: FormBuilder,
    private domSanitizer:DomSanitizer,
    private dataService:DataService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog,  
    ) { }

        
  ngOnInit() {

    this.creditReviewForm = this.formBuilder.group({
      amount:['', Validators.required],
      // action:['', Validators.required],
      comment:['']
    })

    // console.log(this.data, "Data ");
    // console.log(this.selectedRequest, "Selected Request");
    
    
    // this.request()
    console.log(this.selectedRequest.accountid , "bvn",this.selectedRequest.bvn)
    
    this.getUserPerformance()
    
    
  }

  transform(){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(this.doc);
  }

  getUserPerformance(){
    this.loading = true;
    this.dataService.creditService.userPerformanceDetails(this.selectedRequest.accountid)
    
    .subscribe( res => {
      if(res['message'] == "Success"){
        this.userPerformance = res;
        this.loading = false;
      }
      else{
        this.loading = false;
        this.snackBar.open(res['data'], "Dismiss", {
          duration:6000
        })
      }
      
    }, err => {
      this.loading = false;
      this.snackBar.open("Error connecting to server, try again", "Dismiss", {
        duration:6000
      })
    })
  }

   creditCheckPerformance(){
    
    this.loading = true;
    // this.selectedRequest.bvn
    //console.log(this.selectedRequest)
      this.dataService.creditService.creditCheckPerformance(this.selectedRequest.bvn,this.selectedRequest)
      .subscribe((res:any)=>{
        var success = res.message.substring(8);
        if(success==0){
          this.creditCheckMsg=true
          this.loading = false;
        }
        else if(success==2){
          var burid = res.data.body.searchResultlist.searchResultItem.bureauid;
          var checkSubject={
            "bureauid":burid,
            "reference":res.data.reference_no,
            "requestid":res.data.request_id
          }
         this.data.creditService.checkCreditSubjectPost(checkSubject).subscribe((res:any)=>{
            this.loading = false;
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = false;
            dialogConfig.data = res;
            dialogConfig.minWidth = "60%";
            dialogConfig.maxHeight = "90vh"
            this.dialog.open(UserReportComponent,dialogConfig)
           })
        }

        else if(success==3){
          var bureauLength = res.data.body.searchResultlist.searchResultItem.length
          var val1 = res.data.body.searchResultlist.searchResultItem[0].bureauid;
          var val2 = res.data.body.searchResultlist.searchResultItem[1].bureauid;
          // var val3 = res.data.body.searchResultlist.searchResultItem[2].bureauid;
          // var val4 = res.data.body.searchResultlist.searchResultItem[4].bureauid
          
            
            //  var id = res.data.body.searchResultlist.searchResultItem[i].bureauid
             
             var ref = res.data.reference_no;
             var req = res.data.request_id;
             var name = res.data.body.searchResultlist.searchResultItem[0].name;
             var gender = res.data.body.searchResultlist.searchResultItem[0].gender;
            
             this.creditData = {ref,req,val1,val2,name,gender}
             this.loading = false;
          
          const dialogConfig = new MatDialogConfig();
          dialogConfig.disableClose = false;
          dialogConfig.autoFocus = false;
          dialogConfig.data=this.creditData
          dialogConfig.minWidth = '50%';
          // dialogConfig.data = row;
          this.dialog.open(CreditBureauComponent, dialogConfig);
        
        }
      })
   }
  request(){
    // if(this.requestActionForm.invalid){
    //   return;
    // }
    // this.loading = true;

    // let form = this.requestActionForm
    // this.newMessage.comment = form.get('comment').value;
    // this.newMessage.status = form.get('status').value;

    this.dataService.creditService.previewBankStatement(this.selectedRequest.accountid)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( (res) => {
      this.loading = false;
      this.doc = 'data:image/png;base64,'+ res;
      // this.dialogRef.close();
      this.snackBar.open('Done',"Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error! try again","Dismiss",{
        duration:2000
      })
    })
  }

  approveCreditReview(){
    this.loading = true;
    this.formModel = { 
      approveamount: this.creditReviewForm.get('amount').value,
      comment: this.creditReviewForm.get('comment').value,
      // action: this.creditReviewForm.get('action').value,
      requestid: this.selectedRequest.accountid
    }

    // console.log(this.formModel);

    this.dataService.creditService.approveRequestReview(this.formModel)
    .subscribe( (res) => {
      if(res['message'] == "Success"){
        this.loading = false;
        this.doc = 'data:image/png;base64,'+ res['data'];
        // this.dialogRef.close();
        this.snackBar.open('Done',"Dismiss", {
          duration:2000
        })
      }

      else{
        this.loading = false;        // this.dialogRef.close();
        this.snackBar.open(res['data'],"Dismiss")
      }
      
    }, err => {
      this.loading = false;
      this.snackBar.open("Error! try again","Dismiss",{
        duration:2000
      })
    })
    
  }

  creditCheck(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '50%';
    // dialogConfig.data = row;
    this.dialog.open(CreditCheckComponent, dialogConfig);
  }

  viewStatement(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '50%';
    dialogConfig.data = { pdfSrc: 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf'}
    // dialogConfig.data = row;
    this.dialog.open(CreditAccountStatementComponent, dialogConfig);
  }

  viewCreditHistory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '50%';
    // dialogConfig.data = row;
    this.dialog.open(CreditRequestHistoryComponent, dialogConfig);
  }
  viewBureauId() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data=
    dialogConfig.minWidth = '50%';
    // dialogConfig.data = row;
    this.dialog.open(CreditBureauComponent, dialogConfig);
  }
  openUserView(){
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = true;
    dialConfig.autoFocus = false;
    dialConfig.data = this.selectedRequest;
    dialConfig.minWidth = "60%";
    dialConfig.maxHeight = "90vh";
    this.dialog.open(UserReportComponent,dialConfig)
    
  }
    
  closeDialog(){
    this.dialogRef.close();
    event.preventDefault();
  }
}

