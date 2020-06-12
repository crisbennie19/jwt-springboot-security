import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { MatTableDataSource, MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-support-tickest',
  templateUrl: './support-tickest.component.html',
  styleUrls: ['./support-tickest.component.scss']
})
export class SupportTickestComponent implements OnInit {

  public listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  message: string = "Please choose a date range to search "
  searchKey: any = '';
  displayedColumns = ['id', 'ticketid', 'category', 'email', 'number', 'description', 'date', 'status'];
  loading: boolean;
  tableLength: number;
  mydata: any;
  fromdate: any;
  todate: any
  response: any;



  constructor(private data: DataService, private router: Router, private pipes: DatePipe) { }

  ngOnInit() {

    this.getInitList();
  }
  getInitList() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const formatdate1 = this.pipes.transform(firstDay, 'yyyy-MM-dd')
    const formatdate2 = this.pipes.transform(lastDay, 'yyyy-MM-dd')
    this.loading = true
    this.data.supportService.getAllIssues(formatdate1, formatdate2).subscribe((res: any) => {
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

        this.message = res.message
        this.loading = false;
      }


    }, err => {
      this.loading = false;


    })
  }

  getTicketList() {

    if (this.searchKey == '' && this.fromdate != null && this.todate != null) {

      this.loading = true
      const fromday = this.fromdate.getDate();
      const frommonth = this.fromdate.getMonth() + 1;
      const fromyear = this.fromdate.getFullYear();
      const fromdateFormatted = fromyear + '-' + frommonth + '-' + fromday;


      const today = this.todate.getDate();
      const tomonth = this.todate.getMonth() + 1;
      const toyear = this.todate.getFullYear()
      const todateFormatted = toyear + '-' + tomonth + '-' + today;


      this.data.supportService.getAllIssues(fromdateFormatted, todateFormatted).subscribe((res: any) => {
        if (res.message == "Success") {

          this.mydata = res.data;
          this.loading = false;
          this.tableLength = this.mydata.length;
          this.listData = new MatTableDataSource(this.mydata);
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
        }
        else {

          this.message = res.message
        }


      }, err => {
        this.loading = false;


      })
    }
    else if (this.fromdate == null || this.todate == null) {
      this.loading = false

      this.message = "Please ensure you choose a valid date"

    }

  }
  getSelectedRow(value) {

    this.router.navigate(['/issue-details', value.id], { state: { data: value } });
  }
  applyFilter() {
    this.listData.filter = this.searchKey.toString();

  }

  clearSearch() {
    this.searchKey = '';
    this.applyFilter()
  }
}
