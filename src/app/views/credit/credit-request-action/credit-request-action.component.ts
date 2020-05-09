import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { UserReportComponent } from '../../users/user-report/user-report.component';

@Component({
  selector: 'app-credit-request-action',
  templateUrl: './credit-request-action.component.html',
  styleUrls: ['./credit-request-action.component.scss']
})
export class CreditRequestActionComponent implements OnInit {
  public requestActionForm:FormGroup;
  toPerform:string;
  
  newMessage = {
    comment:'',
    status:false
  }
  loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private selectedRequest:any,
    private dialogRef: MatDialogRef<CreditRequestActionComponent>,
    private formBuilder: FormBuilder,
    private data:DataService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog
    ) { }

  ngOnInit() {
    this.requestActionForm = this.formBuilder.group({
      'comment':['', Validators.required],
      'status':['', Validators.required],
    })
  }

  performAction(event){
   const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = true;
    dialConfig.autoFocus = false;
    
    dialConfig.minWidth = "760px";
    dialConfig.maxHeight = "90vh"
    this.dialog.open(UserReportComponent,dialConfig)
  }
 

  request(){
    if(this.requestActionForm.invalid){
      return;
    }
    this.loading = true;

    let form = this.requestActionForm
    this.newMessage.comment = form.get('comment').value;
    this.newMessage.status = form.get('status').value;

    this.data.creditService.UpdateCreditRequest(
      this.newMessage.comment, this.selectedRequest.id,  this.newMessage.status, {}
    ).subscribe( () => {
      this.loading = false;
      this.dialogRef.close();
      this.snackBar.open('Request Action successful' , "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      // this.snackBar.open("Error! try again","Dismiss",{
      //   duration:2000
      // })
    })
  }

  closeDialog(){
    this.dialogRef.close();
    event.preventDefault();
  }

}

