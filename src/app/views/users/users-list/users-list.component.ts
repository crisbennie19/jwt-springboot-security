import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fullname','account','email','phone', 'status'];
  public listData: MatTableDataSource<any>; 

  searchKey: any = ''; // left search box model
  
  loading: boolean;
  tableLength: number;
  response: any;

  constructor(private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(){
    this.loading = true;
    this.data.usersService.getDefaultUsers()
    // .pipe(
    //   map( res => res['data'])
    // )
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
    this.listData.filter = this.searchKey.toString();
  }

  clearSearch(){
    this.searchKey = '';
    this.applyFilter();
  }

}

