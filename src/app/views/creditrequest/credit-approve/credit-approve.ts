import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

import * as moment from 'moment';
@Component({
  selector: 'app-credit-approve',
  templateUrl: './credit-approve.component.html',
  styleUrls: ['./credit-approve.component.scss']
})
export class CreditApproveComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description','account','phone','date', 'status','action'];
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
    this.getCreditRequestApproveList();
  }

  getCreditRequestApproveList(){
    this.loading = true;
    this.data.creditService.getCreditRequestsApprove()
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
    this.data.creditService.getCreditRequestsApproveByDateRange(formatFromDate, formatToDate)
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
      // console.log(err)
      // this.snackBar.open("Check your network and try again", "Dismiss", {
      //   duration:2500
      // })
      console.log(this.listData.data)
    });

  }

  requestAction(row){}

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

}