import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['account', 'amount','date','charges'];
  public listData: MatTableDataSource<any>; 


  loading: boolean;
  tableLength: number;
  response: any;

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

  constructor(private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getTransactionList();
    this.dashboardDetails();
  }

  getTransactionList(){
    this.loading = true;
    this.data.transactionService.getTransactions(0,5)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.response = res;
      this.loading = false;
      this.tableLength = this.response.length;
      this.listData = new MatTableDataSource(this.response);        
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
    }, err => {
      this.loading = false;
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2000
      })
    })
  }

  dashboardDetails(){
    this.loading = true;
    this.data.dashboardService.getDashboard()
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.dashboard = res;
      this.loading = false;
    }, err => {
      this.loading = false;
      this.snackBar.open("Error connecting to server, try again", "Dismiss", {
        duration:2000
      })
    })
  }
}
