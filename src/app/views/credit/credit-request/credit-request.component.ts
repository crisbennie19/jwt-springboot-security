import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogConfig, MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { CreditRequestActionComponent } from '../credit-request-action/credit-request-action.component';
import { CreditBankStatementComponent } from '../credit-bank-statement/credit-bank-statement.component';

import * as moment from 'moment'
@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.scss']
})
export class CreditRequestComponentMain implements OnInit {

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
    this.getCreditRequests();
  }

  triggerFilter(event){    
    let filtername = event.value
    switch (filtername) {
      case 'approve':
        this.placeholder = "Approved Requests";
        this.creditFilter = "approve";
        if(this.fromdate === null && this.todate === null) this.getCreditRequestsApprove();
        else{
          let setToday:Date = new Date();
          const formatFromDate: string = moment(this.fromdate).format();
          let formatToDate: string = moment(this.todate).format();
      
          if(this.todate === null) { formatToDate = moment(setToday).format() }; //current time if value is empty
            this.getCreditRequestsApproveByDateRange(formatFromDate, formatToDate);
          }
        break;
      case 'decline':
        this.placeholder = "Declined Requests"        
        this.creditFilter = "approve";
        if(this.fromdate === null && this.todate === null) {}
        break;
      case 'inProgress':
        this.placeholder = "Waiting for approval";
        if(this.fromdate === null && this.todate === null)  this.getCreditRequestsAwaitApproval();
        break;
      case 'review':
          this.placeholder = "Waiting for review";
          this.creditFilter = "approve";
          if(this.fromdate === null && this.todate === null)  this.getCreditRequestsAwaitReview();
          break;
      default:
          this.placeholder = "Select An Option"      
          break;
    }

  }

  getCreditRequests(){
    this.loading = true;
    this.data.creditService.getCreditRequests(0,100)
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

  getCreditRequestsApprove(){
    this.loading = true;
    this.data.creditService.getCreditRequestsApprove()
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
  
  getCreditRequestsApproveByDateRange(fromdate:string, todate:string){
    this.loading = true;
    this.data.creditService.getCreditRequestsApproveByDateRange(fromdate, todate)
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

  getCreditRequestsAwaitApprovalByDateRange(fromdate:string, todate:string){
    this.loading = true;
    this.data.creditService.getCreditRequestsAwaitApprovalByDateRange(fromdate, todate)
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
      console.log(err);
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2500
      })
    })
  }

  getCreditRequestsAwaitReview(){
    this.loading = true;
    this.data.creditService.getCreditRequestsAwaitReview()
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

  getCreditRequestsAwaitReviewByDateRange(fromdate:string, todate:string){
    this.loading = true;
    this.data.creditService.getCreditRequestsAwaitReviewByDateRange(fromdate, todate)
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

  viewStatement(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '80%';
    dialogConfig.data = row
    this.dialog.open(CreditBankStatementComponent, dialogConfig)
  }

  requestAction(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '40%';
    dialogConfig.data = row
    this.dialog.open(CreditRequestActionComponent, dialogConfig).afterClosed()
    .subscribe( () => this.getCreditRequests())
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
    console.log(formatFromDate, "From");

    if(this.todate === null) { formatToDate = moment(setToday).format() }; //current time if value is empty
        
  
     switch (this.creditFilter) {
      case 'approve':
        this.getCreditRequestsApproveByDateRange(formatFromDate, formatToDate);
        break;
      case 'decline':
        //TODO
        break;
      case 'inProgress':
        this.placeholder = "Waiting for approval";
        this.getCreditRequestsAwaitApprovalByDateRange(formatFromDate, formatToDate)
        break;
      case 'review':
          this.placeholder = "Waiting for review";
          this.creditFilter = "approve";
          if(this.fromdate === null && this.todate === null)  this.getCreditRequestsAwaitReview();
          break;
      default:
          this.placeholder = "Select An Option"      
          break;
    }
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
    this.getCreditRequests();
  }

}

