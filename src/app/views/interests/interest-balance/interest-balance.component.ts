import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-interest-balance',
  templateUrl: './interest-balance.component.html',
  styleUrls: ['./interest-balance.component.scss']
})
export class InterestBalanceComponent implements OnInit {

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

  constructor(private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getBalanceList();
  }

  getBalanceList(){
    this.loading = true;
    this.data.interestService.getInterestsBalance(0,1000)
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
