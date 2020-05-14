import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialogConfig, MatDialog, MatDatepickerInput, MatDatepickerInputEvent } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { WalletViewComponent } from '../wallet-view/wallet-view.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','phone','amount','bal','trantype','date','action'];
  public listData: MatTableDataSource<any>;

  savingsFilter:string = "accountholder";
  placeholder = 'Savings phone or email'
  searchKey: any = ''; // Search box model
  fromdate: Date = null;
  todate:Date = null;
  loading: boolean;
  tableLength: number;
  response: any;
  daterRangeMsg:"No record found for the date range "

  constructor(private data:DataService,
    private snackBar:MatSnackBar,
    private dialog:MatDialog
    ) { }

  ngOnInit() {
    this.getWalletsList();
  }
  applyFilterDate(filter:string){
  this.listData.filter
 
}
  triggerFilter(event){
    let filtername = event.value
    switch (filtername) {
      case 'type':
      this.placeholder = "Savings type"
      break;
      case 'accountholder':
      this.placeholder = "Savings phone or email"
      break;
      case 'category':
      this.placeholder = "Savings category"
      break;
      default:
      this.placeholder = "Savings phone or email"
        break;
    }

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
      this.getWalletsList()
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
    } else{
      this.daterRangeMsg
    }
    
  }

  openWallet(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = row
    dialogConfig.minWidth = '60%';
    dialogConfig.maxHeight = '90vh';
    this.dialog.open(WalletViewComponent, dialogConfig)
  }

  getWalletsList(){
    this.loading = true;
    this.data.walletService.getWallets(1,1000)
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

  applyFilter(){
    this.listData.filter = this.searchKey.toLowerCase();
  }

  clearSearch(){
    this.searchKey = '';
    // this.applyFilter();
    this.getWalletsList();
  }

}

