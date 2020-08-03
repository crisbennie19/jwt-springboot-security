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
  airvendBalance:any
  flutterwaveBalance: number
  loadingpaystack: boolean
  loadingmonify: boolean
  loadingairvend:boolean
  errorMsg: string;


  lastUpdate = Date.now();
  dashboard = {
    "totalusers": 0,
    "dailyusers":0,
    "totalcard": 0,
    "dailycard" : 0,
    "totalinterest": 0.0,
    "totalcredit": 0.0,
    "dailycredit" : 0.0,
    "totallock": 0.0,
    "totaltarget": 0.0,
    "totalcore": 0.0,
    "totalsaving": 0.0,
    "dailysaving" : 0.0,
    "totalcharges": 0.0,
    "dailycharges" : 0.0,
    "totalwallet" : 0.0
   
  };


  constructor(private data: DataService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
   
    this.dashboardDetails();
    this.getPaystack();
    this.getMonify()
    ///this.getAirvend();
  }


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

  getAirvend() {
    this.loadingairvend = true
    this.data.swipeBalance.getAirvendBalance().subscribe((res: any) => {
      console.log(res)
      if (res['message'] != null) {
        this.loadingairvend = false
        this.airvendBalance = res['data']

      }
      else {
        this.loadingairvend = false
        this.errorMsg = "Not avaailable"
      }

    }, err => {
      this.loadingairvend = false
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
