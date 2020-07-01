import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { getFirstDayMonth, getDate } from 'src/app/helpers/dateFormat';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DefaulterViewComponent } from './defaulter-view/defaulter-view.component';

@Component({
  selector: 'app-default-users',
  templateUrl: './default-users.component.html',
  styleUrls: ['./default-users.component.scss']
})
export class DefaultUsersComponent implements OnInit {

  public listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  message: string = "Please choose a date range to search "
  searchKey: any = '';
  displayedColumns = ['name', 'contactmobile',  'contactemail',  'amount'];
  loading: boolean;
  tableLength: number;
  mydata: any;
  fromdate = getFirstDayMonth(new Date())
  todate = getDate(new Date())
  response: any;



  constructor(private data: DataService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {

    this.getInitList();
  }
  
  getInitList() {
   
    this.loading = true
    this.data.debtCollection.getDefaultUserListByDateRange(this.fromdate, this.todate)
    .subscribe((res: any) => {
      
      if (res.message == "Success") {
        //console.log(res.data)
        this.mydata = res.data;
        this.loading = false;
        this.tableLength = this.mydata.length;
        this.listData = new MatTableDataSource(this.mydata);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.loading = false;
        
      }
      else {
        this.message = res.message
        this.loading = false;
      }
    }, err => {
      this.loading = false;
    })
  }

  getDefaultList() {
    this.loading = true;
     let fromdate = getDate(this.fromdate)
     let todate = getDate(this.todate)

      this.data.debtCollection.getDefaultUserListByDateRange(fromdate, todate).subscribe((res: any) => {
        if (res.message == "Success") {
          this.mydata = res.data;
        this.loading = false;
        this.tableLength = this.mydata.length;
        this.listData = new MatTableDataSource(this.mydata);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
        this.loading = false;
        }
        else {
        this.loading = false;
          this.message = res.message
        }


      }, err => {
        this.loading = false;


      })
    

  }
 
  applyFilter() {
    this.listData.filter = this.searchKey.toString();
    this.listData['accountid'].filter = this.searchKey.toString();

  }

  clearSearch() {
    this.searchKey = '';
    this.applyFilter()
  }
  viewRow(rowValues){
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = false;
    dialConfig.autoFocus = false;
    dialConfig.data = rowValues;
    dialConfig.minWidth = "40%";
    dialConfig.maxHeight = "90vh"
    this.dialog.open(DefaulterViewComponent,dialConfig)
     
  }
}
