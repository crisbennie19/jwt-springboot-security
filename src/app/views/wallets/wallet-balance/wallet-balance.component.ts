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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','email','phone','currency','amount','date'];
  public listData: MatTableDataSource<any>; 

  savingsFilter:string = "accountholder";
  placeholder = 'Savings phone or email'
  searchKey: any = ''; // Search box model
  loading: boolean;
  tableLength: number;
  response: any;

  constructor(private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getBalanceList();
  }

  getBalanceList(){
    this.loading = true;
    this.data.walletService.getWalletsBalance(0,1000)
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
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2500
      })
    })
  }

  applyFilter(){
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

}
