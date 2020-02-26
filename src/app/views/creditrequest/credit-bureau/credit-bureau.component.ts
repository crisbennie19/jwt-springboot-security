import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatDialogConfig, MatDialog } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { UserReportComponent } from '../../users/user-report/user-report.component';

@Component({
  selector: 'app-credit-bureau',
  templateUrl: './credit-bureau.component.html',
  styleUrls: ['./credit-bureau.component.scss']
})
export class CreditBureauComponent implements OnInit {
referenceNo:any;
requestId:any
name:any
gender:any
val1:string;
val2: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public bureauData:any,
    private DialogRef: MatDialogRef<CreditBureauComponent>,
    private data:DataService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    //this.DataFromPreviousDial.og();
   this.val1 = this.bureauData.val1;
   this.val2 = this.bureauData.val2
   this.name = this.bureauData.name;
   this.gender = this.bureauData.gender
  
   
  }
onDialoglose(){
this.DialogRef.close();
event.preventDefault();
}
performance(event){
 var checkSubject={
   "bureauid":event,
   "reference":this.bureauData.ref,
   "requestid":this.bureauData.req
 }
this.data.creditService.checkCreditSubjectPost(checkSubject).subscribe((res:any)=>{
 
const dialogConfig = new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = false;
dialogConfig.data = res;
dialogConfig.minWidth = "60%";
dialogConfig.maxHeight = "90vh"

this.dialog.open(UserReportComponent,dialogConfig)

  })
}
}
