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
  displayedColumns = ['fullname','account','phone','date', 'status','action'];
  public listData: MatTableDataSource<any>; 
  list=[];

  searchKey: any = ''; // left search box model
  savingsFilter:string = "accountholder";
  fromdate: Date = null;
  todate:Date = null;
  loading: boolean;
  tableLength: number;
  response: any;
  userId:any;
  status:string;
  daterRangeMsg:"No record found for the date range "
  searchBack:boolean;
  placeholder = 'Savings phone or email'
  
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
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
    }, err => {
      this.loading = false;
      this.snackBar.open("Check your network and try again", "Dismiss", {
        duration:2500
      })
    })
  }

  searchByDate(){
   
    if(this.searchKey == '' && this.fromdate != null && this.todate != null ){
      const fromday = this.fromdate.getDate();
      const frommonth = this.fromdate.getMonth()+1;
      const fromyear = this.fromdate.getFullYear();
      const fromdateFormatted = fromyear+'-'+frommonth+'-'+fromday;

      const today = this.todate.getDate();
      const tomonth = this.todate.getMonth()+1;
      const toyear = this.todate.getFullYear()
      const todateFormatted = toyear+'-'+tomonth+'-'+today;
     
      this.loading = true;
      
      this.data.usersService.getUserByDateRange(fromdateFormatted,todateFormatted)
      .pipe(map( res => res['data']))
      .subscribe( res => {
        this.response = res;
        this.loading = false;
        this.tableLength = res.length
        this.listData = new MatTableDataSource(res);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.searchBack = true;
        
      }, err => {
        this.loading = false;
      
      })
    } else{
      this.daterRangeMsg
    }
    
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

