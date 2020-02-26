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
reportOrderDate:any
confidenceScore:any
dob:any
gender:any
citizenship:any
address:any
phone:any
firstReportedDate:any
facilitiesCount:any
performingFacility:any
nonPerformingFacility:any
approvedAmount:any
accountBalance:any
dishonoredChequesCount:any
reason:any
userID:any
mailTo:any
referenceNO:any
bureauID:any
sourceID:any
id_value:any
idDisplayName:any
expireDate:any

//IDENTIFICATION
sourceId:any
idValue:any
displayName:any


//CRC_CONSUMER_ADDRESS
consumerAddress:any
slno:any
caddress:any
lastReportDate:any
inquiryDate:any
institution_type:any
product_name:any
institution_name:any


//CONSUMER_RELATION
headingText:any
ownershipType:any
total_no_creditgrantors:any
total_no_creditfacilities:any
sanction_amount:any
total_outstanding:any

//SUMMARY_OF_PERFORMANCE
consumer_credit_facility_si
           bureau_loan_type    
           structure_id   
           sanctioned_amount   
           first_disburse_date    
           ownership_indicator               
           installment_amount  
           last_amount_paid   
           asset_classification
           current_balance 
           outstanding_amt_principal
           over_due_amt_pricipal 
           max_num_days_due 
           over_due_amt_int
           
           planned_closure_date
           account_status 
           bureau_guarantor_coverage
           bureau_security_coverage
           bureau_currency 
           sanction_date  
           primary_root_id 
           active_root_id 
           ruid    
           provider_source
           category_desc   
           institution_sequence  
           bureau_acc_status   
           balanceamount    
           ranking    
           coverage   
           title_of_facility
           title_of_facility1 
           currency_value  
           principal_repayment
           identifyinstitution  
           primaryroot_id:any    
           activeroot_id 
           first_reported_date  
           last_reported_date 
           from_month_year   
           to_month_year  

          // consumer_history_summary   
          activeRoot_id  
          frommonth_year 
          tomonth_year   
          month   
          maximum_number_of_days_overdue_int  
          maximum_number_of_days_overdue 

          ///////////////////////////
          mgconsumer_credit_facility_si 
          consumer_dishonoured_cheques 
          mfconsumer_dishonoured_cheques 
          mgconsumer_dishonoured_cheques  
   








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
    console.log(this.selectedData.data['HEADER'])
    console.log(this.selectedData.data['BODY'])
    this.reportOrderNumber=this.selectedData.data['HEADER']['REPORT-HEADER']['REPORT-ORDER-NUMBER'];
    this.userName = this.selectedData.data['HEADER']['SEARCH-RESULT-LIST']['SEARCH-RESULT-ITEM']['NAME']

    this.institution=this.selectedData.data['BODY']['MFCREDIT_SUMMARY']['CURRENCY']['SUMMARY_OF_PERFORMANCE']['PROVIDER_SOURCE'];
    this.bvn = this.selectedData.data['HEADER']['SEARCH-CRITERIA']['BVN_NO']
    this.reportOrderDate = this.selectedData.data['HEADER']['REPORT-HEADER']['REPORT-DATE']
    this.confidenceScore = this.selectedData.data['HEADER']['SEARCH-RESULT-LIST']['SEARCH-RESULT-ITEM']['CONFIDENCE-SCORE']
    this.dob = this.selectedData.data['BODY']['CONSUMER_PROFILE']['CONSUMER_DETAILS']['DATE_OF_BIRTH']
    this.gender = this.selectedData.data['BODY']['CONSUMER_PROFILE']['CONSUMER_DETAILS']['GENDER']
    if(this.gender =='002'){
        this.gender = "Female"
    }else{
      this.gender = "Male"
    }
    this.citizenship = this.selectedData.data['BODY']['CONSUMER_PROFILE']['CONSUMER_DETAILS']['CITIZENSHIP']
    this.phone = this.selectedData.data['HEADER']['SEARCH-RESULT-LIST']['SEARCH-RESULT-ITEM']['PHONE-NUMBER']
    this.address = this.selectedData.data['HEADER']['SEARCH-RESULT-LIST']['SEARCH-RESULT-ITEM']['ADDRESSES']
    this.firstReportedDate = this.selectedData.data['BODY']['CONSUMER_PROFILE']['SUBJECT_NAMES']['FIRST_REPORTED_DATE']
    this.facilitiesCount = this.selectedData.data['BODY']['MFCREDIT_SUMMARY']['CURRENCY']['SUMMARY_OF_PERFORMANCE']['FACILITIES_COUNT']
    this.performingFacility = this.selectedData.data['BODY']['MFCREDIT_SUMMARY']['CURRENCY']['SUMMARY_OF_PERFORMANCE']['PERFORMING_FACILITY']
    this.nonPerformingFacility = this.selectedData.data['BODY']['MFCREDIT_SUMMARY']['CURRENCY']['SUMMARY_OF_PERFORMANCE']['NONPERFORMING_FACILITY']
    this.approvedAmount = this.selectedData.data['BODY']['MFCREDIT_SUMMARY']['CURRENCY']['SUMMARY_OF_PERFORMANCE']['APPROVED_AMOUNT']
    this.accountBalance = this.selectedData.data['BODY']['MFCREDIT_SUMMARY']['CURRENCY']['SUMMARY_OF_PERFORMANCE']['ACCOUNT_BALANCE']
    this.dishonoredChequesCount = this.selectedData.data['BODY']['MFCREDIT_SUMMARY']['CURRENCY']['SUMMARY_OF_PERFORMANCE']['DISHONORED_CHEQUES_COUNT']



  }
  closeDialog(){
    this.dialogRef.close()
    event.preventDefault()
  }
 
}
