import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDatepickerInputEvent } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

import * as moment from 'moment';
@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})
export class CreditCardComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['card','balance','expiry','date', 'status','action'];
  public listData: MatTableDataSource<any>; 

  searchKey: any = ''; // left search box model
  creditFilter:string = "accountholder";
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
    this.data.cardService.getCards(0,100)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( (res) => {
      
      this.loading = false;
      this.tableLength = res.length
      this.listData = new MatTableDataSource(res);        
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
      
    
      
    }, err => {
      this.loading = false;
      // this.snackBar.open("Check your network and try again", "Dismiss", {
      //   duration:2000
      // })
    })
  }

  activateCard(e){
    this.loading = true;
    this.data.cardService.activateCard(e.accountid, {})
    .subscribe( (res) => {

      if(res['message'] == 'Success'){
      this.loading = false;
      this.snackBar.open(res['Message'], "Dismiss", {
        duration:2000
      })
      }
      else{
        this.loading = false;
        this.snackBar.open(res['data'], "Dismiss") 
      }
     
    }, err => {
      this.loading = false;
      // this.snackBar.open("Error! Activating card, try again", "Dismiss", {
      //   duration:2000
      // })
    })
  }
  
  deactivateCard(e){
    this.loading = true;
    this.data.cardService.deactivateCard(e.accountid, {})
    .subscribe( (res) => {
      if(res['message'] == 'Success'){
 this.loading = false;
      this.snackBar.open(res['Message'], "Dismiss", {
        duration:2000
      })
      }
      else{
        this.loading = false;
        this.snackBar.open(res['data'], "Dismiss") 
      }

     
    }, err => {
      this.loading = false;
      // this.snackBar.open("Error! Deactivating card, try again", "Dismiss", {
      //   duration:2000
      // })
    })
  }

  terminateCard(e){
    this.loading = true;
    this.data.cardService.terminateCard(e.bin)
    .subscribe( (res) => {
      if(res['message'] == 'Success'){
      this.loading = false;
      this.snackBar.open("Card deactivated", "Dismiss", {
        duration:2500
      })
      }
      else{
        this.loading = false;
        this.snackBar.open(res['data'], "Dismiss") 
      }
      
    }, err => {
      this.loading = false;
      // this.snackBar.open("Error! Deactivating card, try again", "Dismiss", {
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
    this.loading = true;
    this.data.cardService.getCardsByDateRange(formatFromDate, formatToDate)
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
      // this.snackBar.open("Check your network and try again", "Dismiss", {
      //   duration:2000
      // })
    })
  }
 
  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

}

