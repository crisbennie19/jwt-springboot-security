import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { getFirstDayMonth, getDate } from 'src/app/helpers/dateFormat';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.component.html',
  styleUrls: ['./repayment.component.scss']
})
export class RepaymentComponent implements OnInit {

  
  public listData: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  message: string = "Please choose a date range to search "
  searchKey: any = '';
  displayedColumns = ['accountname','email','amount',  'trandate'];
  loading: boolean;
  tableLength: number;
  mydata: any;
  fromdate = getFirstDayMonth(new Date())
  todate = getDate(new Date())
  response: any;



  constructor(private data: DataService, private router: Router, private pipes: DatePipe) { }

  ngOnInit() {

    this.getInitList();
  }
  
  getInitList() {
   
    this.loading = true
    this.data.debtCollection.getCreditRepayment(1,50)
    .subscribe((res: any) => {
      console.log(res.data)
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

  getDefaultList() {
    this.loading = true;
     let fromdate = getDate(this.fromdate)
     let todate = getDate(this.todate)

      this.data.debtCollection.getCreditRepaymentByDateRange(fromdate, todate).subscribe((res: any) => {
         if (res.message == "Success") {
          this.mydata = res.data;
          this.loading = false;
          this.tableLength = this.mydata.length;
          this.listData = new MatTableDataSource(this.mydata);
          this.listData.paginator = this.paginator;
          this.listData.sort = this.sort;
        }
        else {
        this.loading = false;
          this.message = res.message
        }


      }, err => {
        this.loading = false;


      })
    // }
    // else if (this.fromdate == null || this.todate == null) {
    //   this.loading = false

    //   this.message = "Please ensure you choose a valid date"

    // }

  }
  // getSelectedRow(value) {

  //   this.router.navigate(['/issue-details', value.id], { state: { data: value } });
  // }
  applyFilter() {
    this.listData.filter = this.searchKey.toString();

  }

  clearSearch() {
    this.searchKey = '';
    this.applyFilter()
  }
}
