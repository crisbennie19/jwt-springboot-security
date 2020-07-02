import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public listData: MatTableDataSource<any>;

  searchKey: any = ''; // left search box model

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description','channel','type','account', 'amount','date','charges'];
  loading: boolean;
  tableLength: number;
  mydata: any;
  fromdate: Date = null;
  todate:Date = null;
  response: any;
  daterRangeMsg:"No record found for the date range "

  constructor(private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getTransactionList();
  }

  getTransactionList(){
    this.loading = true;
    this.data.transactionService.getTransactions(0,300)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.mydata = res;
      this.loading = false;
      this.tableLength = this.mydata.length;
      this.listData = new MatTableDataSource(this.mydata);
      this.listData.paginator = this.paginator; 
      this.listData.sort = this.sort;
    }, err => {
      this.loading = false;
      // this.snackBar.open("Check your network and try again", "Dismiss", {
      //   duration:2500
      // })
    })
  }
  filterSearch(){
    if(this.searchKey != ''){
      this.loading = true;
      this.data.walletService.getWalletByAccountholder(this.searchKey)
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
      this.data.transactionService.getTransactionByDateRange(fromdateFormatted,todateFormatted)
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
      this.getTransactionList();
    }

  }
  searchByDate(){
    console.log(this.fromdate +" "+ this.todate)
    if(this.searchKey == '' && this.fromdate != null && this.todate != null ){
      const fromday = this.fromdate.getDate();
      const frommonth = this.fromdate.getMonth()+1;
      const fromyear = this.fromdate.getFullYear();
      const fromdateFormatted = fromyear+'-'+frommonth+'-'+fromday;

      const today = this.todate.getDate();
      const tomonth = this.todate.getMonth()+1;
      const toyear = this.todate.getFullYear()
      const todateFormatted = toyear+'-'+tomonth+'-'+today;

      this.loading = true;
      this.data.transactionService.getTransactionByDateRange(fromdateFormatted,todateFormatted)
      .pipe(map( res => res['data']))
      .subscribe( res => {
        this.response = res;
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
    } else{
      this.daterRangeMsg
    }
    
  }

  applyFilter(){
    this.listData.filter = this.searchKey.toString();
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter()
  }

}
