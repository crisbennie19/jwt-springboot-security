import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-credit-card-report',
  templateUrl: './credit-card-report.component.html',
  styleUrls: ['./credit-card-report.component.scss']
})
export class CreditCardReportComponent implements OnInit {

  public listData: MatTableDataSource<any>;

  searchKey: any = ''; // left search box model

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['description', 'channel', 'type', 'account', 'amount', 'date', 'charges'];
  loading: boolean;
  tableLength: number;
  mydata: any;
  fromdate: Date = null;
  todate: Date = null;
  response: any;
  constructor(private data: DataService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTransactionList();
    
  }
  getTransactionList() {
    this.loading = true;
    this.data.transactionService.getTransactions(0, 100)
      .pipe(
        map(res => res['data'])
      )
      .subscribe(res => {
        this.mydata = res;
        this.loading = false;
        this.tableLength = this.mydata.length;
        this.listData = new MatTableDataSource(this.mydata);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }, err => {
        this.loading = false;
        this.snackBar.open("Check your network and try again", "Dismiss", {
          duration: 2500
        })
      })
  }
  getReportByDay(){
    this.data.reportService.getWeeklyWalletReport(2,2020).subscribe((data)=>{
      console.log(data)
    });
  }

}
