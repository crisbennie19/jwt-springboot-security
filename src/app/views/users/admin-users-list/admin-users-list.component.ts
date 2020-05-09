import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { map } from 'rxjs/operators';
import { AdminUserAddComponent } from '../admin-user-add/admin-user-add.component';
import { AdminUsersEditComponent } from '../admin-users-edit/admin-users-edit.component';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.scss']
})
export class AdminUsersListComponent implements OnInit {

  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fullname','account','email','phone', 'status','action'];
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
      // this.snackBar.open("Check your network and try again", "Dismiss", {
      //   duration:2500
      // })
    })
  }

  addAdmin(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    // dialogConfig.width = "80%";
    dialogConfig.minWidth = "50%";
    this.dialog.open(AdminUserAddComponent, dialogConfig).afterClosed()
    .subscribe( () => {
      this.getUsersList();
    });
  }

  editUser(row){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = "80%";
    dialogConfig.maxHeight = '90vh'
    dialogConfig.data = row;
    this.dialog.open(AdminUsersEditComponent, dialogConfig).afterClosed()
    .subscribe( () => {
      this.getUsersList();
    });
  }

  disable(e){
    this.loading = true;  
    this.data.usersService.disableUser(e.id,{})
    .subscribe( (res) => {
      this.loading = false;
      this.snackBar.open(res['data'], "Dismiss", {
        duration:2500
      })
    }, err => {
      this.loading = false;
      // this.snackBar.open("Check your network and try again", "Dismiss", {
      //   duration:2500
      // })
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