import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogConfig, MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { CreditRequestActionComponent } from '../credit-request-action/credit-request-action.component';

import * as moment from 'moment'
import { CreditReviewComponent } from '../credit-review/credit-review.component';
import { CreditToApproveComponent } from '../credit-to-approve/credit-to-approve.component';
@Component({
  selector: 'app-awaiting-approval',
  templateUrl: './awaiting-approval.component.html',
  styleUrls: ['./awaiting-approval.component.scss']
})
export class AwaitingApprrovalComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description','account','phone','date', 'status','action'];
  public listData: MatTableDataSource<any>; 

  creditFilter:string;
  searchKey: any = ''; // left search box model
  fromdate: Date = null;
  todate:Date = null; 
  placeholder = 'Phone or email'

  loading: boolean;
  tableLength: number;

  constructor(private data:DataService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.getCreditRequestsAwaitApproval();
  }

  getCreditRequestsAwaitApproval(){
    this.loading = true;
    this.data.creditService.getCreditRequestsAwaitApproval()
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.loading = false;
      this.tableLength = res.length
      this.listData = new MatTableDataSource(res);        
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
    }, err => {
      this.loading = false;
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2000
      })
    })
  }
  // applyDateRangeFilter()
  getCreditRequestsAwaitApprovalByDateRange(fromdate:string, todate:string){
    // this.loading = true;
    // this.data.creditService.getCreditRequestsAwaitApprovalByDateRange(fromdate, todate)
    // .pipe(
    //   map( res => res['data'])
    // )
    // .subscribe( res => {
    //   this.loading = false;
    //   this.tableLength = res.length
    //   this.listData = new MatTableDataSource(res);        
    //   this.listData.paginator = this.paginator;
    //   this.listData.sort = this.sort;
    // }, err => {
    //   this.loading = false;
    //   this.snackBar.open("Check your network and try again", "Dismiss", {
    //     duration:2000
    //   })
    // })
  }
 

  viewStatement(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '80%';
    dialogConfig.data = row
    this.dialog.open(CreditToApproveComponent, dialogConfig)
  }

  requestAction(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '50%';
    dialogConfig.data = row
    this.dialog.open(CreditToApproveComponent, dialogConfig)
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = false;
    // dialogConfig.minWidth = '40%';
    // dialogConfig.data = row
    // this.dialog.open(CreditRequestActionComponent, dialogConfig).afterClosed()
    // .subscribe( () => this.getCreditRequestsAwaitApproval())
  }

  applyFilter(){
    this.listData.filter = this.searchKey.toString();
  }

  addEvent(type:string, event:MatDatepickerInputEvent<Date>){
      this.applyDateRangeFilter();
  };

  applyDateRangeFilter(){
    let setToday:Date = new Date();
    const formatFromDate: string = moment(this.fromdate).format();
    let formatToDate: string = moment(this.todate).format();

    if(this.todate === null) { formatToDate = moment(setToday).format() }; //current time if value is empty
        
    this.getCreditRequestsAwaitApprovalByDateRange(formatFromDate, formatToDate)
    
    // console.log(formatToDate, "To Date");
    // this.loading = true;
    // this.data.cardService.getCardsByDateRange(formatFromDate, formatToDate)
    // .pipe(
    //   map( res => res['data'])
    // )
    // .subscribe( res => {
    //   this.loading = false;
    //   this.tableLength = res.length
    //   this.listData = new MatTableDataSource(res);        
    //   this.listData.paginator = this.paginator;
    //   this.listData.sort = this.sort;
    //   console.log(this.listData.data);
    // }, err => {
    //   this.loading = false;
    //   this.snackBar.open("Check your network and try again", "Dismiss", {
    //     duration:2000
    //   })
    // })
  }
 
  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

  fromClearDate(event) {
    event.stopPropagation();
    this.fromdate = null;
    this.getCreditRequestsAwaitApproval();
  }

}

