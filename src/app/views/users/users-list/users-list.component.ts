import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatDialogConfig,MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/data.service';
import { UsersViewComponent } from '../users-view/users-view.component';
import { AdminUsersEditComponent } from '../admin-users-edit/admin-users-edit.component';
import { UserReportComponent } from '../user-report/user-report.component';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {


  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fullname','account','phone', 'status','action'];
  public listData: MatTableDataSource<any>; 
  list=[];

  searchKey: any = ''; // left search box model
  
  loading: boolean;
  tableLength: number;
  response: any;
  userId:any;
  status:string;
  
  constructor(private data:DataService,
    private snackBar:MatSnackBar, private dialog:MatDialog) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(){
    this.loading = true;
    this.data.usersService.getUsers(0,1000)
    .pipe(
      map( res => res['data']) 
    )
    .subscribe( res => {
      //  res.forEach((dat)=>{
         
      //    console.log(dat.Id)
      //  })
      this.response = res;
      
      this.loading = false;
      this.tableLength = this.response.length
      this.listData = new MatTableDataSource(this.response); 

      
      this.listData.data.forEach(element => {
        if(element.status=="Active"){
          this.status="Disable"
        }else{
          this.status="Enable"
        }
      });
      console.log(this.list.values);   
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
openUserView(row){
 
const dialConfig = new MatDialogConfig();
dialConfig.disableClose = true;
dialConfig.autoFocus = false;
dialConfig.data = row;
dialConfig.minWidth = "60%";
dialConfig.maxHeight = "90vh"
this.dialog.open(UsersViewComponent,dialConfig)

} 
openUserReport(row){
 
  const dialConfig = new MatDialogConfig();
  dialConfig.disableClose = true;
  dialConfig.autoFocus = false;
  dialConfig.data = row;
  dialConfig.minWidth = "760px";
  dialConfig.maxHeight = "90vh"
  this.dialog.open(UserReportComponent,dialConfig)
  
  } 

openUserEdit(row){
  const dialConfig = new MatDialogConfig();
  dialConfig.disableClose = true;
  dialConfig.autoFocus = false;
  dialConfig.data = row;
  dialConfig.minWidth = "60%";
  dialConfig.maxHeight = "90vh"
  this.dialog.open(AdminUsersEditComponent,dialConfig)
  
  }

disableUser(row){
  //  if(this.data.usersService.disableUser(row.id,row)){
    
  //   console.log(row);


  //  //}else{

   
  //   // console.log("failed")
  // // }
}

// checkStatus(){
//   if(this.listData.data.){
//    this.status="Enable"
//   }else{
//     this.status="disable"
//   }
// }

}

