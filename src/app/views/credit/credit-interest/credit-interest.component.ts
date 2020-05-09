import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

import * as moment from 'moment';
@Component({
  selector: 'app-credit-interest',
  templateUrl: './credit-interest.component.html',
  styleUrls: ['./credit-interest.component.scss']
})
export class CreditInterestComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['account','phone','email','date', 'status'];
  public listData: MatTableDataSource<any>; 

  creditFilter:string = "accountholder";
  searchKey: any = ''; // left search box model
  fromdate: Date = null;
  todate:Date = null; 
  placeholder = 'Phone or email'
  
  loading: boolean;
  tableLength: number;

  constructor(private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getCardList();
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

  getCardList(){
    this.loading = true;
    this.data.creditService.getCredits(0,100)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      if(res == "Record Not Found"){
        this.loading = false;
        this.tableLength = 0
        this.listData = new MatTableDataSource([]);        
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;   
      }
      else{
        this.loading = false;
        this.tableLength = res.length
        this.listData = new MatTableDataSource(res);        
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }
      
    }, err => {
      this.loading = false;
      // this.snackBar.open("Check your network and try again", "Dismiss", {
      //   duration:2500
      // })
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
    this.data.creditService.getCreditByDateRange(formatFromDate, formatToDate)
    .pipe(
        map( res => res['data'])
    ).subscribe(res => {
      this.loading = false;
      this.tableLength = res.length;
      this.listData = new MatTableDataSource(res);
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