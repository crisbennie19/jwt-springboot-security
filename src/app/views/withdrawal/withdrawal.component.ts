import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { getFirstDayMonth, getDate } from 'src/app/helpers/dateFormat';
import { DefaulterViewComponent } from '../debtcollection/default-users/defaulter-view/defaulter-view.component';
import { WithdrawalViewComponent } from './withdrawal-view/withdrawal-view.component';


@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit {
  public listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  message: string = "Please choose a date range to search "
  message2:string = ""
  searchKey: any = '';
  displayedColumns = ['accountname', 'accountnumber',  'amount',  'walletbalance','action'];
  loading: boolean;
  tableLength: number;
  mydata: any;
  fromdate = getFirstDayMonth(new Date())
  todate = getDate(new Date())
  response: any;
  totalAmount: number = 0;
  email:string



  constructor(private data: DataService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {

    this.getWithdrawalList();
  }


  getWithdrawalList() {
   
    this.loading = true
    this.data.withdrawal.getWithdrawalList(1,1000)
    .subscribe((res: any) => {
      if (res.message == "Success") {
        this.mydata = res.data;
        this.loading = false;
        this.tableLength = this.mydata.length;
        this.listData = new MatTableDataSource(this.mydata);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.loading = false;
      }
      else {
        this.message = res.message
        this.loading = false;
      }
    }, err => {
      this.loading = false;
    })
  }

  getWithdrawalByEmail() {
    this.loading = true;
    

      this.data.withdrawal.getWithdrawalByEmail(this.email).subscribe((res: any) => {
        if (res.message == "Success") {
          this.mydata = res.data;
        this.loading = false;
        this.tableLength = this.mydata.length;
        this.listData = new MatTableDataSource(this.mydata);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.loading = false;
        }
        else {
        this.loading = false;
          this.message = res.message
        }


      }, err => {
        this.loading = false;


      })
    

  }
  getWithdrawalByDate() {
    this.loading = true;
     
     let todate = getDate(this.todate)

      this.data.withdrawal.getWithdrawlByDate(todate).subscribe((res: any) => {
        if (res.message == "Success") {
          this.mydata = res.data;
        this.loading = false;
        this.tableLength = this.mydata.length;
        this.listData = new MatTableDataSource(this.mydata);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.loading = false;
        }
        else {
        this.loading = false;
          this.message = res.message
        }


      }, err => {
        this.loading = false;


      })
    

  }
 
  applyFilter() {
    this.listData.filter = this.searchKey.toString();
    this.listData['accountid'].filter = this.searchKey.toString();

  }

  clearSearch() {
    this.searchKey = '';
    this.applyFilter()
  }
  

  approve(row){
    const payload = {
      "auth": "SWIPE.@#$.%",
      "requestid":row.id ,
      "status": "approve"
    }

    this.data.withdrawal.getWithdrawal_aprove_decline(payload).subscribe((res:any)=>{
       if(res.data =="Success"){
         this.message2 = "Success!"
       }else{
         this.message2 ="Failed"
       }
    })
  }

  decline(row){

  }

  viewRow(rowValues){
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = false;
    dialConfig.autoFocus = false;
    dialConfig.data = rowValues.walletdetails;
    dialConfig.minWidth = "40%";
    dialConfig.maxHeight = "90vh"
    this.dialog.open(WithdrawalViewComponent,dialConfig)
     
  }


}