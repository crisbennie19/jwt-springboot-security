import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogConfig, MatDialog, MatDatepickerInputEvent } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { SavingsViewComponent } from '../savings-view/savings-view.component';

import * as moment from 'moment';
@Component({
  selector: 'app-savings-list',
  templateUrl: './savings-list.component.html',
  styleUrls: ['./savings-list.component.scss']
})
export class SavingsListComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['account','amount','savingtype', 'trantype','date','canwithdraw','action'];
  public listData: MatTableDataSource<any>; 

  savingsFilter:string = "accountholder";
  placeholder = 'Phone or email'
  searchKey: any = ''; // Search box model
  fromdate: Date = null;
  todate:Date = null; 
  loading: boolean;
  tableLength: number;
  response: any;

  constructor(
    private data:DataService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog
    ) { }

  ngOnInit() {
    this.getSavingsList();
  }
  triggerFilter(event){    
    console.log("========================================================")
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

  filterSearch(){
    if(this.searchKey != ''){
      console.log(this.searchKey)
      let filter = this.savingsFilter
      switch (filter) {
        case 'type':
        this.loading = true;
        this.data.savingsService.getSavingsByType(this.searchKey)
        .pipe(map( res => res['data']))
        .subscribe( res => {
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
        })
        break;
        case 'accountholder':
        this.loading = true;
        this.data.savingsService.getSavingsByAccountholder(this.searchKey)
        .pipe(map( res => res['data'])) 
        .subscribe( res => {
          this.loading = false;
          this.tableLength = res.length
          this.listData = new MatTableDataSource(res);        
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
        }, err => {
          this.loading = false;
          // this.snackBar.open("Check your network and try again", "Dismiss", {
          //   duration:2500
          // })
        })
        break;
        case 'category':
        this.loading = true;
        this.data.savingsService.getSavingsByCategory(this.searchKey)
        .pipe(map( res => res['data'])) 
        .subscribe( res => {
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
        })
        break;
        default:
        this.getSavingsList()      
        break;
      }
    }
    else if(this.searchKey == '' && this.fromdate != null && this.todate != null ){
      const fromday = this.fromdate.getDate();
      const frommonth = this.fromdate.getMonth();
      const fromyear = this.fromdate.getFullYear();
      const fromdateFormatted = fromyear+'-'+frommonth+'-'+fromday;

      const today = this.todate.getDate();
      const tomonth = this.todate.getMonth();
      const toyear = this.todate.getFullYear()
      const todateFormatted = toyear+'-'+tomonth+'-'+today;
      
      this.loading = true;
      this.data.savingsService.getSavingsByDateRange(fromdateFormatted,todateFormatted)
      .pipe(map( res => res['data'])) 
      .subscribe( res => {
        this.response = res;
        this.loading = false;
        this.tableLength = res
        this.listData = new MatTableDataSource(res);        
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }, err => {
        this.loading = false;
        // this.snackBar.open("Check your network and try again", "Dismiss", {
        //   duration:2500
        // })
      })
    }

    else{
      this.getSavingsList()
    }
    
  }

  getSavingsList(){
    this.loading = true;
    this.data.savingsService.getSavings(0,100)
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
    }, err => {
      this.loading = false;
      // this.snackBar.open("Check your network and try again", "Dismiss", {
      //   duration:2500
      // })
    })
  }

  viewSaving(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.data = row
    dialogConfig.minWidth = '60%'
    dialogConfig.maxHeight = '90vh'
    this.dialog.open(SavingsViewComponent, dialogConfig)
  }

  addEvent(type:string, event:MatDatepickerInputEvent<Date>){
    this.applyDateRangeFilter();
  };

  applyDateRangeFilter(){
    let setToday:Date = new Date();
    const formatFromDate: string = moment(this.fromdate).format();
    let formatToDate: string = moment(this.todate).format();

    if(this.todate === null) { formatToDate = setToday.toString() }; //current time if value is empty
    this.data.savingsService.getSavingsByDateRange(formatFromDate, formatToDate)
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


  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
    this.getSavingsList();
  }

}
