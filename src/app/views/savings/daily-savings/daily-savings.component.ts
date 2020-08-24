import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogConfig, MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

import * as moment from 'moment';
import { SavingsTimelineComponent } from '../savings-timeline/savings-timeline.component';
import { SavingsViewComponent } from '../savings-view/savings-view.component';
import { getDate, getFirstDayMonth } from 'src/app/helpers/dateFormat';
@Component({
  selector: 'app-daily-savings',
  templateUrl: './daily-savings.component.html',
  styleUrls: ['./daily-savings.component.scss']
})
export class DailySavingsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns = ['account', 'amount','interestamount','balancebefore','balanceafter', 'date','action'];
  public listData: MatTableDataSource<any>;

  savingsFilter: string = "accountholder";
  placeholder = 'Phone or email'
  searchKey: any = ''; // Search box model
 
  loading: boolean;
  tableLength: number;
  response: any;
  cashout: string;
  daterRangeMsg: "No record found for the date range "
  activeSavings: any;
  flutterwaveBalance:any
  loadingfluttter:boolean
  todate = getDate(new Date())
 
  constructor(
    private data: DataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
   this.getDailySavings()
    this.getFlutter();
    // this.getDailySearch()
  }
  
  getFlutter() {
    this.loadingfluttter = true
    this.data.swipeBalance.getFlutterBalance().subscribe((res: any) => {

      if (res['status'] == "success") {
        this.loadingfluttter = false
        this.flutterwaveBalance = res['data'][0].available_balance;
        
      }
      else {
        this.loadingfluttter = false
      }

    }, err => {
      this.loadingfluttter = false
    })


  }
  getDailySavings(){
    this.loading = true;
    //  let setToday:Date = new Date();
    // const formatFromDate: string = moment(this.todate).format();
    let formatToDate: string = moment(this.todate).format('YYYY-MM-DD');
  
    this.data.savingsService.getDailySavings(formatToDate).subscribe((res:any)=>{
     
     this.response = res.data;
  
      this.loading = false;
      this.listData = new MatTableDataSource(this.response);        
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
    }, err => {
      this.loading = false;
    
    })

  }
  getDailySearch(){
    this.loading = true;
    this.response = null
    let formatToDate: string = moment(this.todate).format('YYYY-MM-DD');
    
  

   this.data.savingsService.getDailySavings(formatToDate).subscribe((res:any)=>{
    this.response = res.data;
 
     this.loading = false;
     this.listData = new MatTableDataSource(this.response);        
     this.listData.paginator = this.paginator;
     this.listData.sort = this.sort;
   }, err => {
     this.loading = false;
   
   })

 }

  viewSaving(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = row
    dialogConfig.minWidth = '60%'
    dialogConfig.maxHeight = '90vh'
    this.dialog.open(SavingsViewComponent, dialogConfig)
  }

  savingTimeline(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = row
    dialogConfig.minWidth = '40%'
    dialogConfig.maxHeight = '90vh'
    this.dialog.open(SavingsTimelineComponent, dialogConfig)
  }

 

  
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  clearSearch() {
    this.searchKey = '';
    this.applyFilter();
    
  }

}
