import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss']
})
export class UserReportComponent implements OnInit {
listData:[];
reportOrderNumber:any;
userName:any
institution:any
bvn:any
reportNumber:any
reportOrderDate:any
@Input() row:number
  constructor(
    @Inject(MAT_DIALOG_DATA) public selectedData:any,
    private dialogRef: MatDialogRef<UserReportComponent>,
    private data:DataService
  ) { }

  ngOnInit() {
    
    this.reportData() 
    
  }
  reportData(){
    this.reportOrderNumber=this.selectedData.data['HEADER']['REPORT-HEADER']['REPORT-ORDER-NUMBER'];
    this.userName=this.selectedData.data['HEADER']['SEARCH-RESULT-LIST']['SEARCH-RESULT-ITEM']['NAME'];
    //this.institution=this.selectedData.data['BODY']['CREDIT_SUMMARY']['CURRENCY']['SUMMARY_OF_PERFORMANCE']['PROVIDER_SOURCE']
    console.log(this.reportOrderNumber );
    console.log(this.userName );
    //console.log(this.institution );
  }
  closeDialog(){
    this.dialogRef.close()
    event.preventDefault()
  }
 
}
