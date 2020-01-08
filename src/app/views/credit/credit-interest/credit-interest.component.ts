import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-credit-interest',
  templateUrl: './credit-interest.component.html',
  styleUrls: ['./credit-interest.component.scss']
})
export class CreditInterestComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['account','phone','email','date', 'status'];
  public listData: MatTableDataSource<any>; 

  searchKey: any = ''; // left search box model
  
  loading: boolean;
  tableLength: number;

  constructor(private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getCardList();
  }

  getCardList(){
    this.loading = true;
    this.data.creditService.getCredits(0,100)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      if(res == "Record Not Found"){
        this.loading = false;
        this.tableLength = 0
        this.listData = new MatTableDataSource([]);        
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;   
      }
      else{
        this.loading = false;
        this.tableLength = res.length
        this.listData = new MatTableDataSource(res);        
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      }
      
    }, err => {
      this.loading = false;
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2500
      })
    })
  }

  applyFilter(){
    this.listData.filter = this.searchKey.toString();
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

}