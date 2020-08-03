import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogConfig, MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { SavingsBalanceViewComponent } from '../savings-balance-view/savings-balance-view.component';

import * as moment from 'moment';
import { format } from 'url';

@Component({
  selector: 'app-savings-balance',
  templateUrl: './savings-balance.component.html',
  styleUrls: ['./savings-balance.component.scss']
}) 

export class SavingsBalanceComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','phone','savingtype','amount','date','action'];
  public listData: MatTableDataSource<any>; 

  savingsFilter:string = "accountholder";
  placeholder = 'Savings phone or email'
  searchKey: any = ''; // Search box model
  fromdate: Date = null; //
  todate:Date = null; 
  loading: boolean;
  tableLength: number;
  response: any;
  storeListdata: any;

  constructor(
    private data:DataService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.getBalanceList();
  }

  triggerFilter(event){    
    let filtername = event.value
    switch (filtername) {
      case 'type':
        this.placeholder = "Savings type"
      break;
      case 'accountholder':
        this.placeholder = "Phone or email"
      break;
      case 'category':
        this.placeholder = "Savings category"
      break;
      default:
        this.placeholder = "Phone or email"      
        break;
    }

  }

  viewBalance(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = row;
    dialogConfig.minWidth = '60%';
    dialogConfig.maxHeight = '90vh';
    this.dialog.open(SavingsBalanceViewComponent, dialogConfig)
  }

  getBalanceList(){
    this.loading = true;
    this.data.savingsService.getSavingsBalance(0,1000)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.response = res;
      this.loading = false;
      this.tableLength = this.response.length
      this.listData = new MatTableDataSource(this.response);        
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
      this.storeListdata = this.listData;
    }, err => {
      this.loading = false;
      // this.snackBar.open("Check your network and try again", "Dismiss", {
      //   duration:2500
      // })
    })
  }
 
  searchByDate(){
    if(this.fromdate != null && this.todate != null ){
      const fromday = this.fromdate.getDate();
      const frommonth = this.fromdate.getMonth();
      const fromyear = this.fromdate.getFullYear();
      const fromdateFormatted = fromyear+'-'+frommonth+'-'+fromday;

      const today = this.todate.getDate();
      const tomonth = this.todate.getMonth();
      const toyear = this.todate.getFullYear()
      const todateFormatted = toyear+'-'+tomonth+'-'+today;
      
      this.loading = true;
      this.data.savingsService.getSavingsBalanceByDateRange(fromdateFormatted,todateFormatted)
      .pipe(map( res => res['data'])) 
      .subscribe( (res:any) => {

        this.loading = false;
      this.tableLength = res.length
      this.listData = new MatTableDataSource(res);        
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
      }, err => {
        this.loading = false;
        
      })
    }
    
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  addEvent(type:string, event:MatDatepickerInputEvent<Date>){
    this.applyDateRangeFilter();
  };

  applyDateRangeFilter(){
    let setToday:Date = new Date();
    const formatFromDate: string = moment(this.fromdate).format();
    let formatToDate: string = moment(this.todate).format();

    if(this.todate === null) { formatToDate = setToday.toString() }; //current time if value is empty
    this.data.savingsService.getSavingsBalanceByDateRange(formatFromDate, formatToDate)
    .pipe(
        map( res => res['data'])
    ).subscribe(res => {
      this.response = res;
      this.loading = false;
      this.tableLength = this.response.length
      this.listData = new MatTableDataSource(this.response);        
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
    }, err => {
      this.loading = false;
      // this.snackBar.open("Check your network and try again", "Dismiss", {
      //   duration:2500
      // })
    });

  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

}
