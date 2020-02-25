import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDatepickerInputEvent, MatDialogConfig, MatDialog } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

import * as moment from 'moment';
import { CreditReviewComponent } from '../credit-review/credit-review.component';

@Component({
  selector: 'app-awaiting-review',
  templateUrl: './awaiting-review.component.html',
  styleUrls: ['./awaiting-review.component.scss']
})
export class AwaitingReviewComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description','account','phone','date', 'status','action'];
  public listData: MatTableDataSource<any>; 

  searchKey: any = ''; // left search box model
  creditFilter:string = "accountholder";
  fromdate: Date = null;
  todate:Date = null; 
  placeholder = 'Phone or email'
  
  loading: boolean;
  tableLength: number;

  constructor(private data:DataService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog ) { }

  ngOnInit() {
    this.getCreditList();
  }

  getCreditList(){
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

  activateCard(e){
    this.loading = true;
    this.data.cardService.activateCard(e.accountid, {})
    .subscribe( (res) => {
      this.loading = false;
      this.snackBar.open(res['Message'], "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error! Activating card, try again", "Dismiss", {
        duration:2000
      })
    })
  }
  
  deactivateCard(e){
    this.loading = true;
    this.data.cardService.deactivateCard(e.accountid, {})
    .subscribe( (res) => {
      this.loading = false;
      this.snackBar.open(res['Message'], "Dismiss", {
        duration:2000
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error! Deactivating card, try again", "Dismiss", {
        duration:2000
      })
    })
  }

  terminateCard(e){
    this.loading = true;
    this.data.cardService.terminateCard(e.bin)
    .subscribe( () => {
      this.loading = false;
      this.snackBar.open("Card deactivated", "Dismiss", {
        duration:2500
      })
    }, err => {
      this.loading = false;
      this.snackBar.open("Error! Deactivating card, try again", "Dismiss", {
        duration:2500
      })
    })
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
    this.loading = true;
    this.data.creditService.getCreditRequestsAwaitReviewByDateRange(formatFromDate, formatToDate)
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

  requestAction(row){    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data=row
    dialogConfig.minWidth = '60%';
    this.dialog.open(CreditReviewComponent, dialogConfig);
    console.log(row)
  }

  viewStatement(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = '80%';
    dialogConfig.data = row;
    this.dialog.open(CreditReviewComponent, dialogConfig);
  }
 
  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

}

