import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-wallet-balance',
  templateUrl: './wallet-balance.component.html',
  styleUrls: ['./wallet-balance.component.scss']
})
export class WalletBalanceComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','email','phone','amount','date'];
  public listData: MatTableDataSource<any>;

  savingsFilter:string = "accountholder";
  placeholder = 'Savings phone or email'
  searchKey: any = ''; // Search box model
  loading: boolean;
  tableLength: number;
  response: any;
  fromdate: Date = null;
  todate:Date = null;
  daterRangeMsg:"No record found for the date range "
  constructor(private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getBalanceList();
  }

  getBalanceList(){
    this.loading = true;
    this.data.walletService.getWalletsBalance(1,1000)
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
      this.data.walletService.getWalletByDateRange(fromdateFormatted,todateFormatted)
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
    }

    else{
     // this.getWalletsList()
    }

  }

  searchByDate(){
    
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
      this.data.walletService.getWalletBalanceByDateRange(fromdateFormatted,todateFormatted)
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
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

}
