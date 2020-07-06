import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['target', 'lock', 'core', 'interest'];
  public listData: MatTableDataSource<any>;


  loading: boolean;
  tableLength: number;

  paystackBalance: any
  monifyBalance: any
  flutterwaveBalance: number
  loadingpaystack: boolean
  loadingmonify: boolean
  errorMsg: string;


  lastUpdate = Date.now();
  dashboard = {
    "totalusers": 0,
    "totalcard": 0,
    "totalinterest": 0,
    "totalcredit": 0,
    "totallock": 0,
    "totaltarget": 0,
    "totalcore": 0,
    "totalsaving": 0,
    "totalcharges": 0
  };


  constructor(private data: DataService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    // this.getTransactionList();
    this.dashboardDetails();
    this.getPaystack();
    this.getMonify()
  }

  // getTransactionList(){
  //   this.loading = true;
  //   this.data.transactionService.getTransactions(0,5)
  //   .pipe(
  //     map( res => res['data'])
  //   )
  //   .subscribe( res => {
  //      this.response = {
  //       "totallock": res.totallock,
  //       "totaltarget": res.totaltarget,
  //       "totalcore": res.totalcore,
  //       "totalinterest": res.totalinterest,
  //     }
  //     //this.response = res;
  //     this.loading = false;
  //     this.tableLength = this.response.length;
  //     console.log(this.response)

  //     this.listData = new MatTableDataSource(this.response);        
  //     // this.listData.paginator = this.paginator;
  //     // this.listData.sort = this.sort;
  //   }, err => {
  //     this.loading = false;
  //     // this.snackBar.open("Check your network and try again", "Dismiss", {
  //     //   duration:2000
  //     // })
  //   })
  // }
  getPaystack() {
    this.loadingpaystack = true
    this.data.swipeBalance.getPaystackBalance().subscribe((res: any) => {

      if (res['message'] == "Balances retrieved") {
        this.loadingpaystack = false
        this.paystackBalance = res['data'][0].balance;

      }
      else {
        this.loadingpaystack = false
      }

    }, err => {
      this.loadingpaystack = false
    })


  }
  getMonify() {
    this.loadingmonify = true
    this.data.swipeBalance.getMonifyBalance().subscribe((res: any) => {
      if (res['responseMessage'] == "success") {
        this.loadingmonify = false
        this.monifyBalance = res['responseBody']['availableBalance']

      }
      else {
        this.loadingmonify = false
        this.errorMsg = "Not avaailable"
      }

    }, err => {
      this.loadingmonify = false
      this.errorMsg = "Network error"
    })
  }


  dashboardDetails() {
    this.loading = true;
    this.data.dashboardService.getDashboard()
      .pipe(
        map(res => res['data'])
      )
      .subscribe(res => {


        this.tableLength = res.length;
        this.listData = new MatTableDataSource(res);
        this.dashboard = res;

        this.loading = false;
      }, err => {
        this.loading = false;
        this.snackBar.open("Error connecting to server, try again", "Dismiss", {
          duration: 2000
        })
      })
  }
}
