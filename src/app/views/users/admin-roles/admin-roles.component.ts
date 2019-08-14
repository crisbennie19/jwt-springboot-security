import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-admin-roles',
  templateUrl: './admin-roles.component.html',
  styleUrls: ['./admin-roles.component.scss']
})
export class AdminRolesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['account','fullname','phone','email'];
  public listData: MatTableDataSource<any>; 

  searchKey: any = ''; // left search box model
  
  loading: boolean;
  tableLength: number;

  constructor(private dialog:MatDialog,
    private data:DataService,
    private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(){
    this.loading = true;
    this.data.usersService.getAdminUsers(0,1000)
    .pipe(
      map( res => res['data'])
    )
    .subscribe( res => {
      this.loading = false;
      this.tableLength = res.length
      this.listData = new MatTableDataSource(res);        
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
    }, err => {
      this.loading = false;
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2500
      })
    })
  }

  disable(e){
    this.loading = true;  
    this.data.usersService.disableUser(e.id,{})
    .subscribe( () => {
      this.loading = false;
      this.snackBar.open("User disabled successfully", "Dismiss", {
        duration:2500
      })
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